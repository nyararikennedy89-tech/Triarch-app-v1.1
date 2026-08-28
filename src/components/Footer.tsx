import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const officeKeys = Object.keys(siteConfig.offices);
  const [activeOffice, setActiveOffice] = useState<string>(officeKeys[0] || 'Nairobi');

  const offices = siteConfig.offices;
  const currentOffice = offices[activeOffice] || Object.values(offices)[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  return (
    <footer id="contact" className="bg-[#121312] text-white pt-20 pb-12 border-t border-white/10">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-white text-[#1C1C1C] flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V10a4 4 0 0 1 8 0v11" />
                  <path d="M13 21V8a4 4 0 0 1 8 0v13" />
                  <path d="M8 21V14a2 2 0 0 1 4 0v7" />
                </svg>
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-wider text-white uppercase block leading-none">
                  {siteConfig.brand.name}
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#B76E4A] font-semibold uppercase block leading-tight mt-0.5">
                  {siteConfig.brand.subName}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              {siteConfig.brand.shortDescription}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-gray-300 hover:text-white transition-colors"
                >
                  {social.platform}
                </a>
              ))}
            </div>

            {/* Newsletter Subscription Box */}
            {siteConfig.features.enableNewsletter && (
              <div className="pt-2 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                  Subscribe to Architectural Insights
                </span>
                {subscribed ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Subscribed to {siteConfig.brand.name} Quarterly Journal!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#4E6B5A] flex-1"
                    />
                    <button
                      type="submit"
                      className="bg-[#4E6B5A] hover:bg-[#3B5344] text-white p-2.5 rounded-full transition-colors shrink-0 cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-heading font-bold text-white uppercase tracking-widest">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {siteConfig.navigation.mainLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-amber-200 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Location Switcher Column */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-heading font-bold text-white uppercase tracking-widest">
              Global Studio Offices
            </h4>

            {/* Office Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {officeKeys.map((locKey) => (
                <button
                  key={locKey}
                  onClick={() => setActiveOffice(locKey)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeOffice === locKey
                      ? 'bg-[#B76E4A] text-white'
                      : 'bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {locKey}
                </button>
              ))}
            </div>

            {/* Active Office Details */}
            {currentOffice && (
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-gray-300">
                <div className="font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B76E4A]" />
                  <span>{currentOffice.city}</span>
                </div>
                <div className="text-gray-400 pl-6">{currentOffice.address}</div>
                <div className="text-gray-400 pl-6 flex items-center gap-2 pt-1">
                  <Phone className="w-3.5 h-3.5 text-[#4E6B5A]" />
                  <a href={`tel:${currentOffice.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                    {currentOffice.phone}
                  </a>
                </div>
                <div className="text-gray-400 pl-6 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#4E6B5A]" />
                  <a href={`mailto:${currentOffice.email}`} className="hover:text-white transition-colors">
                    {currentOffice.email}
                  </a>
                </div>
                {currentOffice.hours && (
                  <div className="text-gray-500 pl-6 text-[11px]">
                    {currentOffice.hours}
                  </div>
                )}
              </div>
            )}

            {/* Consultation Direct Button */}
            <button
              onClick={onOpenConsultation}
              className="w-full bg-white text-[#1C1C1C] hover:bg-[#4E6B5A] hover:text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Schedule Direct Project Briefing</span>
            </button>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.brand.legalName} All rights reserved. {siteConfig.brand.practiceRegistration}
          </div>
          <div className="flex items-center gap-6">
            {siteConfig.navigation.legalLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-gray-300">
                {link.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
