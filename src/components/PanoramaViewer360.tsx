import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { PanoramaRoom, PanoramaHotspot } from '../types';
import {
  Compass,
  Maximize2,
  Minimize2,
  RotateCw,
  Eye,
  Glasses,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Info,
  ArrowRight,
  Sun,
  Sunset,
  Moon,
  Volume2,
  VolumeX,
  Layers,
  MapPin,
  Move
} from 'lucide-react';

interface PanoramaViewer360Props {
  room: PanoramaRoom;
  allRooms?: PanoramaRoom[];
  onSelectRoom?: (room: PanoramaRoom) => void;
  projectName?: string;
  className?: string;
  allowFullscreen?: boolean;
}

export const PanoramaViewer360: React.FC<PanoramaViewer360Props> = ({
  room,
  allRooms = [],
  onSelectRoom,
  projectName = 'Triarch Architectural Project',
  className = '',
  allowFullscreen = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const textureLoaderRef = useRef<THREE.TextureLoader | null>(null);

  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isVRMode, setIsVRMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lightingPreset, setLightingPreset] = useState<'day' | 'sunset' | 'night'>('day');
  const [activeHotspot, setActiveHotspot] = useState<PanoramaHotspot | null>(null);
  const [ambientAudio, setAmbientAudio] = useState(false);
  const [currentYaw, setCurrentYaw] = useState(room.initialLookAt?.yaw || 0);
  const [currentPitch, setCurrentPitch] = useState(room.initialLookAt?.pitch || 0);
  const [fov, setFov] = useState(75);
  const [hotspotScreenPositions, setHotspotScreenPositions] = useState<
    { hotspot: PanoramaHotspot; x: number; y: number; visible: boolean }[]
  >([]);

  // Drag / Interaction State
  const isUserInteracting = useRef(false);
  const onPointerDownPointerX = useRef(0);
  const onPointerDownPointerY = useRef(0);
  const onPointerDownLon = useRef(0);
  const onPointerDownLat = useRef(0);
  const lon = useRef(room.initialLookAt?.yaw || 0);
  const lat = useRef(room.initialLookAt?.pitch || 0);
  const phi = useRef(0);
  const theta = useRef(0);

  // Handle ambient sound synthesis using Web Audio API
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAmbientAudio = () => {
    if (!ambientAudio) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;

          // Gentle ambient wind / soft room resonance synthesizer
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * 0.05;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, ctx.currentTime);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gainNodeRef.current = gain;

          whiteNoise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          whiteNoise.start(0);
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        setAmbientAudio(true);
      } catch {
        setAmbientAudio(false);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setAmbientAudio(false);
    }
  };

  // Convert Spherical Coordinates (Yaw/Pitch in degrees) to 3D Vector
  const getVectorFromSpherical = useCallback((yawDeg: number, pitchDeg: number, radius = 480) => {
    const phiVal = THREE.MathUtils.degToRad(90 - pitchDeg);
    const thetaVal = THREE.MathUtils.degToRad(yawDeg);

    const x = radius * Math.sin(phiVal) * Math.cos(thetaVal);
    const y = radius * Math.cos(phiVal);
    const z = radius * Math.sin(phiVal) * Math.sin(thetaVal);
    return new THREE.Vector3(x, y, z);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(fov, width / height, 1, 1100);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // Sphere Geometry (inverted for interior 360 panorama viewing)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert normals so texture is on the inside

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const textureLoader = new THREE.TextureLoader();
    textureLoaderRef.current = textureLoader;

    // Load initial texture
    setIsLoaded(false);
    textureLoader.load(
      room.panoramaUrl,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          color: new THREE.Color(0xffffff),
        });

        if (sphereMeshRef.current) {
          scene.remove(sphereMeshRef.current);
        }

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        sphereMeshRef.current = mesh;
        setIsLoaded(true);
      },
      undefined,
      () => {
        // Fallback procedural textured sphere if image load fails
        const fallbackCanvas = document.createElement('canvas');
        fallbackCanvas.width = 1024;
        fallbackCanvas.height = 512;
        const ctx = fallbackCanvas.getContext('2d');
        if (ctx) {
          const grad = ctx.createLinearGradient(0, 0, 1024, 512);
          grad.addColorStop(0, '#1C1C1C');
          grad.addColorStop(0.5, '#2D3A34');
          grad.addColorStop(1, '#1A1D1A');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 1024, 512);
          ctx.fillStyle = '#B76E4A';
          ctx.font = 'bold 28px sans-serif';
          ctx.fillText('Triarch 360° Architectural Panoramic Studio', 200, 260);
        }
        const fallbackTex = new THREE.CanvasTexture(fallbackCanvas);
        const material = new THREE.MeshBasicMaterial({ map: fallbackTex });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        sphereMeshRef.current = mesh;
        setIsLoaded(true);
      }
    );

    // Animation Loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (isAutoRotating && !isUserInteracting.current) {
        lon.current += 0.08;
      }

      // Clamp vertical pitch to prevent gimbal flip
      lat.current = Math.max(-85, Math.min(85, lat.current));

      phi.current = THREE.MathUtils.degToRad(90 - lat.current);
      theta.current = THREE.MathUtils.degToRad(lon.current);

      const targetX = 500 * Math.sin(phi.current) * Math.cos(theta.current);
      const targetY = 500 * Math.cos(phi.current);
      const targetZ = 500 * Math.sin(phi.current) * Math.sin(theta.current);

      if (cameraRef.current) {
        cameraRef.current.lookAt(targetX, targetY, targetZ);

        // Update 2D Screen Positions for 3D Hotspots
        if (room.hotspots && room.hotspots.length > 0 && containerRef.current) {
          const cw = containerRef.current.clientWidth;
          const ch = containerRef.current.clientHeight;

          const updated = room.hotspots.map((hs) => {
            const pos3D = getVectorFromSpherical(hs.yaw, hs.pitch, 480);
            const vector = pos3D.clone().project(cameraRef.current!);

            // Check if point is in front of camera
            const isBehind = vector.z > 1;
            const screenX = (vector.x * 0.5 + 0.5) * cw;
            const screenY = (-(vector.y * 0.5) + 0.5) * ch;

            return {
              hotspot: hs,
              x: screenX,
              y: screenY,
              visible: !isBehind && screenX >= -20 && screenX <= cw + 20 && screenY >= -20 && screenY <= ch + 20,
            };
          });

          setHotspotScreenPositions(updated);
        }

        // Render scene
        if (rendererRef.current && sceneRef.current) {
          if (isVRMode) {
            // Stereoscopic Dual-Camera VR Viewport (Left & Right eye split)
            const halfW = width / 2;
            rendererRef.current.setScissorTest(true);

            // Left Eye
            rendererRef.current.setScissor(0, 0, halfW, height);
            rendererRef.current.setViewport(0, 0, halfW, height);
            cameraRef.current.aspect = halfW / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.render(sceneRef.current, cameraRef.current);

            // Right Eye
            rendererRef.current.setScissor(halfW, 0, halfW, height);
            rendererRef.current.setViewport(halfW, 0, halfW, height);
            rendererRef.current.render(sceneRef.current, cameraRef.current);

            rendererRef.current.setScissorTest(false);
          } else {
            rendererRef.current.setViewport(0, 0, width, height);
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          }
        }
      }

      // Update exported yaw angle for UI compass
      setCurrentYaw((Math.round(lon.current) % 360 + 360) % 360);
      setCurrentPitch(Math.round(lat.current));
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [fov, isAutoRotating, isVRMode, room.panoramaUrl, room.hotspots, getVectorFromSpherical]);

  // Handle Room changes: swap textures smoothly
  useEffect(() => {
    if (!textureLoaderRef.current || !sphereMeshRef.current) return;

    setIsLoaded(false);
    setActiveHotspot(null);

    // Reset lookAt if specified
    if (room.initialLookAt) {
      lon.current = room.initialLookAt.yaw;
      lat.current = room.initialLookAt.pitch;
    }

    textureLoaderRef.current.load(
      room.panoramaUrl,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        if (sphereMeshRef.current) {
          const mat = sphereMeshRef.current.material as THREE.MeshBasicMaterial;
          mat.map = texture;
          mat.needsUpdate = true;
          applyLightingColor(mat, lightingPreset);
        }
        setIsLoaded(true);
      },
      undefined,
      () => setIsLoaded(true)
    );
  }, [room.id, room.panoramaUrl, room.initialLookAt]);

  // Apply Lighting Scene / Tone Mapping
  const applyLightingColor = (mat: THREE.MeshBasicMaterial, preset: 'day' | 'sunset' | 'night') => {
    switch (preset) {
      case 'sunset':
        mat.color.setHex(0xffd5b3); // warm amber sunset
        break;
      case 'night':
        mat.color.setHex(0x9cb8d9); // cool blue moonlight
        break;
      case 'day':
      default:
        mat.color.setHex(0xffffff); // natural day
        break;
    }
    mat.needsUpdate = true;
  };

  const handleLightingPresetChange = (preset: 'day' | 'sunset' | 'night') => {
    setLightingPreset(preset);
    if (sphereMeshRef.current) {
      const mat = sphereMeshRef.current.material as THREE.MeshBasicMaterial;
      applyLightingColor(mat, preset);
    }
  };

  // Pointer / Touch Event Handlers for Looking Around
  const onPointerDown = (event: React.PointerEvent) => {
    isUserInteracting.current = true;
    onPointerDownPointerX.current = event.clientX;
    onPointerDownPointerY.current = event.clientY;
    onPointerDownLon.current = lon.current;
    onPointerDownLat.current = lat.current;
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!isUserInteracting.current) return;
    const factor = 0.15;
    lon.current = (onPointerDownPointerX.current - event.clientX) * factor + onPointerDownLon.current;
    lat.current = (event.clientY - onPointerDownPointerY.current) * factor + onPointerDownLat.current;
  };

  const onPointerUp = () => {
    isUserInteracting.current = false;
  };

  // Zoom / Wheel FOV: only intercept when in fullscreen or when holding Ctrl/Cmd to avoid blocking page scroll
  const handleWheel = (event: React.WheelEvent) => {
    if (isFullscreen || event.ctrlKey || event.metaKey) {
      event.preventDefault();
      const newFov = Math.max(35, Math.min(95, fov + event.deltaY * 0.05));
      setFov(newFov);
      if (cameraRef.current) {
        cameraRef.current.fov = newFov;
        cameraRef.current.updateProjectionMatrix();
      }
    }
  };

  const handleZoom = (delta: number) => {
    const newFov = Math.max(35, Math.min(95, fov + delta));
    setFov(newFov);
    if (cameraRef.current) {
      cameraRef.current.fov = newFov;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Device orientation / Motion gyro helper for mobile
  const enableDeviceMotion = () => {
    if (typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', (e) => {
              if (e.alpha !== null && e.beta !== null) {
                lon.current = e.alpha;
                lat.current = (e.beta - 90) * 0.6;
              }
            });
          }
        })
        .catch(console.error);
    }
  };

  return (
    <div
      ref={containerRef}
      id="panorama-360-container"
      className={`relative w-full overflow-hidden bg-black select-none group/pano font-sans ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onWheel={handleWheel}
    >
      {/* 360 WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md text-white">
          <div className="w-12 h-12 border-3 border-[#B76E4A]/30 border-t-[#B76E4A] rounded-full animate-spin mb-4" />
          <span className="font-heading font-bold text-sm tracking-wider uppercase">Loading 360° Spherical VR Space...</span>
          <span className="text-xs text-gray-400 mt-1">{room.name}</span>
        </div>
      )}

      {/* VR Dual Screen Center Divider */}
      {isVRMode && (
        <div className="absolute inset-y-0 left-1/2 w-[2px] bg-black/80 z-20 pointer-events-none flex flex-col items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
        </div>
      )}

      {/* 3D Hotspot Overlays */}
      {isLoaded &&
        !isVRMode &&
        hotspotScreenPositions.map(({ hotspot, x, y, visible }) => {
          if (!visible) return null;
          const isActive = activeHotspot?.id === hotspot.id;

          return (
            <div
              key={hotspot.id}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
              }}
              className="absolute top-0 left-0 z-20 pointer-events-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (hotspot.targetRoomId && allRooms.length > 0 && onSelectRoom) {
                    const target = allRooms.find((r) => r.id === hotspot.targetRoomId);
                    if (target) {
                      onSelectRoom(target);
                      return;
                    }
                  }
                  setActiveHotspot(isActive ? null : hotspot);
                }}
                className={`relative p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl cursor-pointer group/hotspot ${
                  isActive
                    ? 'bg-[#B76E4A] text-white scale-125 ring-4 ring-[#B76E4A]/40'
                    : 'bg-black/60 hover:bg-[#4E6B5A] text-white border border-white/40 hover:scale-110'
                }`}
                title={hotspot.title}
              >
                {/* Pulsing Outer Ring */}
                <span className="absolute -inset-1 rounded-full bg-[#B76E4A]/30 animate-ping pointer-events-none" />

                {hotspot.targetRoomId ? (
                  <Move className="w-4 h-4 text-amber-200" />
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-300" />
                )}

                {/* Floating Hotspot Title Chip */}
                <span className="absolute left-1/2 -top-8 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover/hotspot:opacity-100 transition-opacity border border-white/20 pointer-events-none shadow-lg">
                  {hotspot.title}
                </span>
              </button>
            </div>
          );
        })}

      {/* Active Hotspot Architectural Spec Card */}
      {activeHotspot && !isVRMode && (
        <div
          className="absolute top-6 left-6 z-30 max-w-sm w-[calc(100%-3rem)] sm:w-80 bg-black/85 backdrop-blur-xl border border-white/20 text-white rounded-2xl p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#B76E4A]/30 text-[#B76E4A]">
                <Sparkles className="w-4 h-4" />
              </span>
              <h4 className="font-heading font-bold text-sm text-white">{activeHotspot.title}</h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-gray-400 hover:text-white p-1 text-xs font-mono"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed mb-3">{activeHotspot.description}</p>

          {activeHotspot.specDetails && (
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-1.5 text-[11px] mb-3">
              {activeHotspot.specDetails.material && (
                <div className="flex justify-between text-gray-400">
                  <span>Material:</span>
                  <strong className="text-white">{activeHotspot.specDetails.material}</strong>
                </div>
              )}
              {activeHotspot.specDetails.manufacturer && (
                <div className="flex justify-between text-gray-400">
                  <span>Sourced From:</span>
                  <strong className="text-amber-200">{activeHotspot.specDetails.manufacturer}</strong>
                </div>
              )}
              {activeHotspot.specDetails.architecturalNote && (
                <div className="pt-1 text-[10px] text-gray-400 border-t border-white/10">
                  💡 {activeHotspot.specDetails.architecturalNote}
                </div>
              )}
            </div>
          )}

          {activeHotspot.targetRoomId && (
            <button
              onClick={() => {
                if (allRooms.length > 0 && onSelectRoom) {
                  const target = allRooms.find((r) => r.id === activeHotspot.targetRoomId);
                  if (target) {
                    onSelectRoom(target);
                    setActiveHotspot(null);
                  }
                }
              }}
              className="w-full bg-[#4E6B5A] hover:bg-[#3B5344] text-white py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Walk into Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Top Bar: Room Meta, Compass & Lighting Presets */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Project & Room Header Badge */}
        <div className="pointer-events-auto bg-black/65 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-white flex items-center gap-3 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#B76E4A]">{projectName}</div>
            <div className="text-xs font-heading font-extrabold flex items-center gap-2">
              <span>{room.name}</span>
              <span className="text-[10px] font-normal text-gray-400">({room.areaSqM} m² • {room.floorLevel})</span>
            </div>
          </div>
        </div>

        {/* Top Right Controls: Lighting Presets & Compass */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Lighting Mode Selector */}
          <div className="bg-black/65 backdrop-blur-md p-1 rounded-full border border-white/15 flex items-center gap-1 shadow-lg">
            <button
              onClick={() => handleLightingPresetChange('day')}
              className={`p-1.5 rounded-full transition-all ${
                lightingPreset === 'day' ? 'bg-amber-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
              title="Daylight Sun Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleLightingPresetChange('sunset')}
              className={`p-1.5 rounded-full transition-all ${
                lightingPreset === 'sunset' ? 'bg-[#B76E4A] text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
              title="Golden Hour Sunset Scene"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleLightingPresetChange('night')}
              className={`p-1.5 rounded-full transition-all ${
                lightingPreset === 'night' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
              title="Twilight / Architectural Night Lighting"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Compass Azimuth Widget */}
          <div
            className="bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white flex items-center gap-1.5 text-xs font-mono shadow-lg"
            title={`Bearing: ${currentYaw}° Azimuth`}
          >
            <Compass
              className="w-3.5 h-3.5 text-[#B76E4A] transition-transform duration-100"
              style={{ transform: `rotate(${currentYaw}deg)` }}
            />
            <span className="text-[11px] font-bold">
              {currentYaw >= 315 || currentYaw < 45
                ? 'N'
                : currentYaw >= 45 && currentYaw < 135
                ? 'E'
                : currentYaw >= 135 && currentYaw < 225
                ? 'S'
                : 'W'}
              {' '}{currentYaw}°
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none gap-2">
        {/* Left Side: Room Description / Category */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 bg-black/65 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15 text-white text-xs shadow-lg">
          <Layers className="w-3.5 h-3.5 text-[#B76E4A]" />
          <span className="text-gray-300">{room.category}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400 text-[11px] max-w-xs truncate">{room.description}</span>
        </div>

        {/* Center/Right Toolbar */}
        <div className="pointer-events-auto ml-auto flex items-center gap-1.5 bg-black/75 backdrop-blur-xl p-1.5 rounded-full border border-white/20 text-white shadow-2xl">
          {/* Auto Rotation Toggle */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-2 rounded-full transition-all cursor-pointer ${
              isAutoRotating ? 'bg-[#4E6B5A] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title={isAutoRotating ? 'Pause 360° Auto-Rotation' : 'Start 360° Auto-Rotation'}
          >
            <RotateCw className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          </button>

          {/* Zoom Out / Zoom In */}
          <button
            onClick={() => handleZoom(8)}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            title="Zoom Out (Wide Angle)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(-8)}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            title="Zoom In (Telephoto Detail)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Ambient Soundscape */}
          <button
            onClick={toggleAmbientAudio}
            className={`p-2 rounded-full transition-all cursor-pointer ${
              ambientAudio ? 'bg-[#B76E4A] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title={ambientAudio ? 'Mute Spatial Soundscape' : 'Enable Spatial Soundscape'}
          >
            {ambientAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* VR Dual Screen Stereoscopic Mode */}
          <button
            onClick={() => {
              setIsVRMode(!isVRMode);
              enableDeviceMotion();
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isVRMode ? 'bg-[#B76E4A] text-white shadow-lg' : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
            }`}
            title="Toggle Stereoscopic VR Headset Mode"
          >
            <Glasses className="w-4 h-4" />
            <span className="hidden sm:inline">{isVRMode ? 'Exit VR' : 'VR Mode'}</span>
          </button>

          {/* Fullscreen Toggle */}
          {allowFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Immersive Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Floating Drag Instruction Hint (fades out on interaction) */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-80 group-hover/pano:opacity-0 transition-opacity duration-500">
        <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-gray-300 flex items-center gap-2 shadow-lg">
          <Move className="w-3.5 h-3.5 text-[#B76E4A]" />
          <span>Click & Drag to Look Around 360° • Click Sparkles for Material Specs</span>
        </div>
      </div>
    </div>
  );
};
