import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'cost-to-build-luxury-home',
    title: 'How Much Does It Cost to Build in Kenya? (2025 Construction Cost Breakdown)',
    slug: 'construction-cost-breakdown-kenya-2025',
    category: 'Cost & Budgeting',
    readTime: '6 min read',
    date: 'July 14, 2025',
    author: {
      name: 'Arch. David Mwangi',
      role: 'Principal Architect & Founder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    summary: 'An empirical guide to residential and commercial building costs per square meter in East Africa, breaking down material, labor, professional fees, and statutory approvals.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    content: `Building a home or commercial property is one of the most significant financial investments you will ever make. Understanding real construction rates per square meter prevents costly budget overruns.

### Average Residential Construction Rates per m²

1. **Standard Finishes (KES 45,000 - 60,000 / m²)**
   • Machine-cut stone walls with smooth plaster finish.
   • Ceramic tile flooring and standard aluminum windows.
   • Standard pitched corrugated iron roof or basic flat slab.

2. **Premium Finishes (KES 65,000 - 90,000 / m²)**
   • Porcelain tiles, engineered hardwood in bedrooms.
   • Powder-coated aluminum profile double glazing.
   • Imported sanitaryware and quartz kitchen countertops.

3. **Ultra-Luxury Finishes (KES 95,000 - 150,000+ / m²)**
   • Cast-in-place board-formed concrete and natural travertine cladding.
   • Low-E motorized curtain wall glass assemblies.
   • Integrated home automation, solar microgrid, and infinity saltwater pool.

### Breakdown of Cost Categories

• **Substructure & Foundation**: 15% - 22% (Depends heavily on soil type - cotton vs rock)
• **Superstructure (Columns, Slabs, Walls)**: 30% - 35%
• **Finishes & Joinery**: 25% - 32%
• **MEP (Plumbing, Electrical, Solar)**: 12% - 18%
• **Professional Fees & Statutory Permits**: 10% - 14%

### Hidden Costs to Watch Out For

1. Soil Stabilization on Black Cotton Soil (Requires deep excavation or pile foundations).
2. Site Boundary Wall and Retaining Structures.
3. Temporary Site Power and Water Supply Connections.
4. NEMA and County Approval Contingency.`
  },
  {
    id: 'building-approval-process-explained',
    title: 'Navigating the Building Approval Process: Step-by-Step Guide',
    slug: 'building-approval-process-guide',
    category: 'Regulatory',
    readTime: '8 min read',
    date: 'June 28, 2025',
    author: {
      name: 'Eng. Sarah Jenkins',
      role: 'Head of Structural Engineering',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    summary: 'A complete checklist of required documents, statutory fees, and timelines for obtaining County Architectural Permits, NEMA EIA Licenses, and NCA Registration.',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    content: `Securing all statutory permits before commencing site mobilization is non-negotiable. Unapproved construction risks enforcement notices, heavy fines, or demolition orders.

### The 4 Required Statutory Clearances

1. **County Architectural & Structural Approval**
   • Signed drawings by a registered Architect (BORAQS) and Structural Engineer (EBK).
   • Certified Title Deed copy and Survey Beacon Map.
   • Submission via the e-Development Approval System (e-DAS).

2. **NEMA Environmental Impact Assessment (EIA)**
   • Environmental Audit by a registered NEMA lead expert.
   • Public participation notice and mitigation measures matrix.

3. **National Construction Authority (NCA) Registration**
   • Contractor NCA License (Class 1 to Class 8 depending on project size).
   • Approved County Plan stamped set.

4. **Water & Sewerage Authorization**
   • Discharge permit and water meter connection approval.`
  },
  {
    id: 'hidden-roof-vs-pitched-roof',
    title: 'Hidden Roof vs. Pitched Roof: Structural & Thermal Performance',
    slug: 'hidden-roof-vs-pitched-roof-comparison',
    category: 'Design Insights',
    readTime: '5 min read',
    date: 'May 19, 2025',
    author: {
      name: 'Arch. David Mwangi',
      role: 'Principal Architect & Founder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    summary: 'Comparing flat parapet hidden roof systems with traditional timber pitched roofs regarding waterproofing, maintenance, aesthetic appeal, and solar readiness.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    content: `Modern contemporary architecture heavily favors the sleek, cubist aesthetic of the "hidden roof" (flat slab or low-pitch roof concealed behind high parapet walls). But how does it perform in tropical heavy rainfall climates?

### Hidden Roof (Flat Slab or Parapet Box)
• **Pros**: Ultra-clean modern profile, rooftop terrace usability, optimal flat plane for solar PV panels.
• **Cons**: Requires premium APP torch-on membrane waterproofing and precise 1:100 slope screed drainage to prevent ponding.

### Pitched Timber / Steel Roof
• **Pros**: Rapid rainwater runoff, high attic air insulation buffer against heat.
• **Cons**: Dominates visual volume, higher timber structural framing cost.`
  },
  {
    id: 'choosing-the-right-architect',
    title: 'Choosing an Architect: 10 Critical Questions to Ask Before Hiring',
    slug: 'choosing-an-architect-guide',
    category: 'Client Advice',
    readTime: '4 min read',
    date: 'April 02, 2025',
    author: {
      name: 'Elena Rostova',
      role: 'Head of Interior Design',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    summary: 'Avoid common pitfalls when hiring an architectural practice. Learn what registration credentials, BIM capabilities, and fee structures to scrutinize.',
    coverImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    content: `Your architect will be your trusted advisor for 1 to 3 years. Asking the right questions upfront ensures alignment in design philosophy, transparency in fees, and smooth site execution.`
  },
  {
    id: 'mastering-construction-budget-contingency',
    title: 'Mastering the Construction Budget & Contingency Guide',
    slug: 'mastering-construction-budget-guide',
    category: 'Cost & Budgeting',
    readTime: '7 min read',
    date: 'March 11, 2025',
    author: {
      name: 'Eng. Sarah Jenkins',
      role: 'Head of Structural Engineering',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    summary: 'How to structure a realistic 10-15% contingency fund, manage variations, and lock down fixed lump-sum contracts with main contractors.',
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    content: `Financial peace of mind during construction comes down to two words: Rigorous Quantity Surveying and Contractual Discipline.`
  }
];
