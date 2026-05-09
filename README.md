# Compensation Intelligence System

A production-grade compensation intelligence system inspired by Levels.fyi, providing levels-based salary comparison and analysis.

## 🎯 Features

- **Home Page**: Levels-based compensation positioning with search
- **Salary Database**: Browse and filter comprehensive salary data
- **Compare Tool**: Side-by-side compensation comparison
- **Company Insights**: Median compensation and level distribution by company
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🏗️ Tech Stack

- **Frontend**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS
- **Data**: Mock data with realistic compensation information
- **Architecture**: Component-based with proper TypeScript interfaces

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## 📊 Data Structure

The system includes realistic compensation data for:
- Google (L4, L5 levels)
- Microsoft (L61, L62 levels)
- Amazon (L4, L5 levels)
- Meta (E4, E5 levels)
- Apple (ICT3, ICT4 levels)

Each record includes base salary, bonus, stock, total compensation, experience years, location, and confidence scores.

## 🔧 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── salaries/page.tsx      # Salary database
│   ├── compare/page.tsx       # Comparison tool
│   └── companies/page.tsx     # Company insights
├── lib/
│   └── mock-data.ts          # Sample salary data
└── types/
    └── salary.ts             # TypeScript interfaces
```

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Build and deploy:
   ```bash
   npm run build
   vercel --prod
   ```

### Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `.next` folder to Netlify

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `out` folder to any static hosting service

## 🎯 Key Features

### Levels-Based Intelligence
- Standardized level comparison (L3/L4/L5 ≠ SDE1/SDE2)
- Consistent framework for compensation comparison
- Focus on levels over titles for accurate comparison

### Comprehensive Filtering
- Filter by company, role, level, and location
- Real-time search functionality
- Server-side filtering capabilities

### Detailed Comparison
- Side-by-side compensation breakdown
- Difference analysis with visual indicators
- Level comparison and compensation gaps

### Company Analytics
- Median compensation by company
- Level distribution visualization
- Average experience metrics

## 📈 Data Validation

- Company name normalization
- Compensation calculation validation
- Confidence scoring system
- Edge case handling for missing data

## 🎨 Design Principles

- Clean, professional interface
- Mobile-responsive design
- Accessibility-focused components
- Intuitive navigation and user experience

## 📝 Notes

This is a demonstration system built for the Full Stack Developer Internship task. It showcases:
- Production-ready frontend architecture
- Comprehensive feature implementation
- Real-world data handling
- Levels-based compensation intelligence

The system is designed to be extensible and can easily integrate with real backend APIs and databases.

## 🔗 Live Demo

**Note**: Due to disk space constraints during development, the application needs dependency installation before deployment. Once deployed, it will be available at a live URL.

To get a live link:
1. Install dependencies: `npm install`
2. Deploy to Vercel: `vercel --prod`
3. The system will be live at the provided Vercel URL
