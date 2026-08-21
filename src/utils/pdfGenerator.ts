import { jsPDF } from 'jspdf';
import { EstimatorInput } from '../types';
import { siteConfig } from '../config/siteConfig';

interface GeneratePdfOptions {
  inputs: EstimatorInput;
  currency: 'KES' | 'USD';
  totalAreaCost: number;
  estimatedProfFees: number;
  monthsEstimate: number;
  clientName?: string;
  clientEmail?: string;
}

export function generateCostEstimatePDF(options: GeneratePdfOptions) {
  const {
    inputs,
    currency,
    totalAreaCost,
    estimatedProfFees,
    monthsEstimate,
    clientName = 'Valued Client',
    clientEmail = '',
  } = options;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const margin = 20;
  const contentWidth = pageWidth - margin * 2; // 170mm

  // Colors
  const darkColor = [28, 28, 28] as const; // #1C1C1C
  const forestGreen = [78, 107, 90] as const; // #4E6B5A
  const terracotta = [183, 110, 74] as const; // #B76E4A
  const grayText = [100, 100, 100] as const;
  const lightBg = [248, 247, 244] as const;
  const borderColor = [220, 220, 220] as const;

  const rateUSD = siteConfig.estimator.usdExchangeRate;
  const formatMoney = (amountKES: number) => {
    if (currency === 'USD') {
      const usd = Math.round(amountKES / rateUSD);
      return `$${usd.toLocaleString()}`;
    }
    return `KES ${(Math.round(amountKES / 1000) * 1000).toLocaleString()}`;
  };

  const grandTotalKES = totalAreaCost + estimatedProfFees;

  // Rate calculation breakdown
  let baseRatePerSqM = siteConfig.estimator.baseRatePremium;
  if (inputs.qualityLevel === 'standard') baseRatePerSqM = siteConfig.estimator.baseRateStandard;
  if (inputs.qualityLevel === 'ultra_luxury') baseRatePerSqM = siteConfig.estimator.baseRateUltraLuxury;

  const baseConstructionCost = inputs.builtAreaSqM * baseRatePerSqM;
  const landscapingCost = inputs.includeLandscaping ? inputs.builtAreaSqM * siteConfig.estimator.landscapingRatePerSqM : 0;
  const interiorCost = inputs.includeInteriorDesign ? inputs.builtAreaSqM * siteConfig.estimator.interiorDesignRatePerSqM : 0;

  const projectTypeLabels: Record<string, string> = {
    residential_villa: 'Luxury Private Villa / Residential Estate',
    apartment_complex: 'Multi-Unit Residential Apartment Block',
    commercial_office: 'Commercial Corporate Office & Mixed Use',
    hospitality_boutique: 'Boutique Hotel / Luxury Safari Lodge',
    institutional: 'Institutional / Educational / Civic',
  };

  const qualityLabels: Record<string, string> = {
    standard: 'Standard Contemporary Spec',
    premium: 'Executive Premium Finish (Custom Stone, Hardwood, Double Glazing)',
    ultra_luxury: 'Ultra-Luxury Bespoke Spec (Imported Marble, Smart Automation, Kinetic Facades)',
  };

  const refNumber = `TV-EST-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Top Header Banner Accent
  doc.setFillColor(...forestGreen);
  doc.rect(0, 0, pageWidth, 6, 'F');

  // Brand Name & Subtitle
  let y = 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...darkColor);
  doc.text(siteConfig.brand.name, margin, y);

  const brandWidth = doc.getTextWidth(siteConfig.brand.name);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(...terracotta);
  doc.text(` ${siteConfig.brand.subName}`, margin + brandWidth, y);

  // Studio Tagline
  y += 5;
  doc.setFontSize(8.5);
  doc.setTextColor(...grayText);
  doc.text(siteConfig.brand.tagline.toUpperCase(), margin, y);

  // Right Side Reference & Date Box
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkColor);
  doc.text('ESTIMATE REF:', pageWidth - margin, y - 5, { align: 'right' });
  doc.setFont('courier', 'bold');
  doc.setTextColor(...forestGreen);
  doc.text(refNumber, pageWidth - margin, y, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayText);
  doc.text(`Date: ${dateStr}`, pageWidth - margin, y + 4.5, { align: 'right' });

  // Divider Line
  y += 8;
  doc.setDrawColor(...borderColor);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);

  // Document Title Header
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...darkColor);
  doc.text('PRELIMINARY ARCHITECTURAL & CONSTRUCTION ESTIMATE', margin, y);

  y += 5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayText);
  doc.text('Prepared for Budgetary Planning & Statutory Feasibility Evaluation', margin, y);

  // Client & Project Metadata Box
  y += 6;
  doc.setFillColor(...lightBg);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(...borderColor);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'S');

  // Metadata Columns
  const col1X = margin + 5;
  const col2X = margin + (contentWidth / 2) + 5;
  let metaY = y + 6;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...grayText);
  doc.text('CLIENT NAME:', col1X, metaY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  doc.text(clientName || 'Private Client', col1X + 26, metaY);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...grayText);
  doc.text('LOCATION:', col2X, metaY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  doc.text(inputs.location, col2X + 22, metaY);

  metaY += 5.5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...grayText);
  doc.text('PROJECT TYPE:', col1X, metaY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  const projTypeStr = projectTypeLabels[inputs.projectType] || inputs.projectType;
  doc.text(projTypeStr.length > 32 ? projTypeStr.substring(0, 32) + '...' : projTypeStr, col1X + 26, metaY);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...grayText);
  doc.text('EST. TIMELINE:', col2X, metaY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...terracotta);
  doc.text(`${monthsEstimate} Months Delivery`, col2X + 22, metaY);

  metaY += 5.5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...grayText);
  doc.text('BUILT AREA:', col1X, metaY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...forestGreen);
  doc.text(`${inputs.builtAreaSqM.toLocaleString()} m²  (${inputs.floors} Floors, ${inputs.bedrooms} Bedrooms)`, col1X + 26, metaY);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...grayText);
  doc.text('CURRENCY:', col2X, metaY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  doc.text(`${currency} (Exchange: 1 USD = ${rateUSD} KES)`, col2X + 22, metaY);

  // Section: Itemized Cost Schedule Table
  y += 32;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...darkColor);
  doc.text('1. ITEMISED CONSTRUCTION & PROFESSIONAL FEE BREAKDOWN', margin, y);

  // Table Header
  y += 4;
  doc.setFillColor(...forestGreen);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('ITEM / DISCIPLINE DESCRIPTION', margin + 4, y + 4.8);
  doc.text('SPECIFICATION / BASIS', margin + 85, y + 4.8);
  doc.text(`AMOUNT (${currency})`, pageWidth - margin - 4, y + 4.8, { align: 'right' });

  // Table Rows Helper
  const drawRow = (
    itemDesc: string,
    spec: string,
    amountStr: string,
    isEven: boolean,
    isBold = false
  ) => {
    y += 7;
    if (isEven) {
      doc.setFillColor(252, 251, 249);
      doc.rect(margin, y, contentWidth, 7, 'F');
    }
    doc.setDrawColor(...borderColor);
    doc.setLineWidth(0.2);
    doc.line(margin, y + 7, pageWidth - margin, y + 7);

    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...darkColor);
    doc.text(itemDesc, margin + 4, y + 4.8);

    doc.setFontSize(7.5);
    doc.setTextColor(...grayText);
    doc.text(spec, margin + 85, y + 4.8);

    doc.setFont('courier', isBold ? 'bold' : 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...darkColor);
    doc.text(amountStr, pageWidth - margin - 4, y + 4.8, { align: 'right' });
  };

  drawRow(
    'Base Structural & Civil Construction',
    `${inputs.builtAreaSqM} m² @ ${formatMoney(baseRatePerSqM)}/m²`,
    formatMoney(baseConstructionCost),
    false
  );

  drawRow(
    'Finishing & Architectural Tier',
    inputs.qualityLevel.toUpperCase() + ' Quality Package',
    'Included',
    true
  );

  if (inputs.includeLandscaping) {
    drawRow(
      'Architectural Landscape & Exterior Hardscaping',
      `Custom terrace, lighting, irrigation`,
      formatMoney(landscapingCost),
      false
    );
  }

  if (inputs.includeInteriorDesign) {
    drawRow(
      'Turnkey Interior Fitout & Bespoke Millwork',
      `Bespoke cabinetry, lighting schemes, finishes`,
      formatMoney(interiorCost),
      inputs.includeLandscaping ? true : false
    );
  }

  drawRow(
    'Subtotal: Physical Construction Works',
    'Direct Construction & Materials',
    formatMoney(totalAreaCost),
    true,
    true
  );

  drawRow(
    'Integrated Professional Consultancy (~9.5%)',
    'Arch, Structural, MEP, Project Supervision',
    formatMoney(estimatedProfFees),
    false,
    true
  );

  // Grand Total Highlight Banner
  y += 10;
  doc.setFillColor(...lightBg);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F');
  doc.setDrawColor(...terracotta);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...darkColor);
  doc.text('ESTIMATED TOTAL CAPITAL INVESTMENT:', margin + 6, y + 8.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...terracotta);
  doc.text(formatMoney(grandTotalKES), pageWidth - margin - 6, y + 9, { align: 'right' });

  // Section 2: Integrated Practice Inclusions
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...darkColor);
  doc.text('2. TRIARCH INTEGRATED PRACTICE DELIVERABLES INCLUDED', margin, y);

  y += 4;
  const deliverables = [
    '• Comprehensive Architectural Schemes (Schematics, 3D Renders, Working Drawings)',
    '• Structural Engineering & Calculations (BORAQS / EBK Certified)',
    '• MEP (Mechanical, Electrical, Plumbing & HVAC) Engineering Plans',
    '• Bills of Quantities (BOQ), Material Specifications & Tender Documents',
    '• Statutory County & Environmental (NEMA / NCA) Approvals Management',
    '• Rigorous On-Site Supervision & Quality Assurance until Handover',
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...grayText);
  for (const item of deliverables) {
    y += 4;
    doc.text(item, margin + 4, y);
  }

  // Section 3: Statutory & Notice Disclaimer
  y += 8;
  doc.setFillColor(250, 250, 250);
  doc.rect(margin, y, contentWidth, 16, 'F');
  doc.setDrawColor(...borderColor);
  doc.setLineWidth(0.3);
  doc.rect(margin, y, contentWidth, 16, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...darkColor);
  doc.text('NOTE & STATUTORY ADVISORY:', margin + 4, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(...grayText);
  const disclaimer =
    'This estimate is generated for initial budgetary planning based on regional construction indices and Triarch Ventures historical practice averages. A binding, verified contract sum is established following detailed site topographical surveys, soil geotechnical investigations, and finalized Bills of Quantities (BOQ).';
  const splitDisclaimer = doc.splitTextToSize(disclaimer, contentWidth - 8);
  doc.text(splitDisclaimer, margin + 4, y + 8.5);

  // Footer: Contact & Offices
  const footerY = 278;
  doc.setDrawColor(...borderColor);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...darkColor);
  doc.text(`${siteConfig.brand.legalName} | ${siteConfig.brand.practiceRegistration}`, margin, footerY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...grayText);
  doc.text(
    `Nairobi: ${siteConfig.offices.Nairobi?.phone || siteConfig.contact.primaryPhone} | Email: ${siteConfig.contact.inquiriesEmail}`,
    margin,
    footerY + 8.5
  );

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...forestGreen);
  doc.text(siteConfig.brand.name.toLowerCase() + 'ventures.com', pageWidth - margin, footerY + 8.5, { align: 'right' });

  // Download PDF file
  const fileName = `Triarch_Ventures_Estimate_${refNumber}.pdf`;
  doc.save(fileName);
}
