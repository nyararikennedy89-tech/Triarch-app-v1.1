# Triarch Ventures Architectural Studio Website

A modern, high-performance web platform for **Triarch Ventures** — a multidisciplinary architectural, interior design, and structural engineering practice.

Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🚀 How to Deploy on Vercel via GitHub

### 1. Push to GitHub
1. Create a repository on [GitHub](https://github.com/new).
2. Push your codebase to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Triarch Ventures website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Import your GitHub repository.
4. **Vercel Settings** (pre-configured automatically via `vercel.json`):
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **"Deploy"**. Your site is now live with automatic CI/CD on every `git push`!

---

## ✏️ How to Easily Edit the Website

All content, branding, contact numbers, and rates are modularized for instant editing without touching complex code:

### 1. Global Brand & Contact Info (`src/config/siteConfig.ts`)
Edit this single file to update:
- **Brand name & slogans**
- **Phone numbers, email addresses, and WhatsApp link**
- **Office addresses** (Nairobi, London, Dubai, etc.)
- **Social media links** (Instagram, LinkedIn, YouTube, X)
- **Hero banner slides, headlines, and metrics**
- **Cost estimator rates** (rates per m², add-on costs, fee percentages, USD exchange rate)

### 2. Projects & Case Studies (`src/data/projects.ts`)
- Add new portfolio projects, images (Unsplash or custom URLs), before/after comparisons, and specifications.

### 3. Services Offered (`src/data/services.ts`)
- Add, update, or reorder architectural disciplines and deliverables.

### 4. 7-Step Design Process (`src/data/process.ts`)
- Customize the client workflow stages from discovery to site handover.

### 5. Testimonials & Client Reviews (`src/data/testimonials.ts`)
- Add client feedback, ratings, and video interview links.

### 6. Articles & Resources (`src/data/blog.ts`)
- Add new architectural articles, design guides, or downloadable whitepapers.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
├── src/
│   ├── config/
│   │   └── siteConfig.ts       # ⭐️ Single source of truth for branding, contact, estimator
│   ├── data/
│   │   ├── projects.ts         # Portfolio projects & case studies
│   │   ├── services.ts         # Architectural & engineering services
│   │   ├── process.ts          # 7-step design workflow
│   │   ├── testimonials.ts     # Client reviews
│   │   └── blog.ts             # Articles & knowledge hub
│   ├── components/             # Reusable UI sections and interactive modals
│   ├── types/                  # TypeScript interface definitions
│   ├── App.tsx                 # Main application view
│   └── index.css               # Tailwind CSS theme
├── vercel.json                 # Vercel deployment routing & headers
├── package.json
└── vite.config.ts
```
