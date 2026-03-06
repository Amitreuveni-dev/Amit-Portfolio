# Amit Reuveni - Professional Portfolio

A modern, scroll-driven portfolio website with Samsung-style animations built with React, TypeScript, and Framer Motion.

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **State Management:** Redux Toolkit
- **Styling:** SCSS Modules with CSS Variables
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Project Structure

```
src/
├── components/
│   ├── Header/          # Sticky header with nav, font resizer, theme toggles
│   ├── Hero/            # Landing section with tech stack icons
│   ├── Timeline/        # Vertical timeline (Military, Education, Volunteering)
│   ├── Projects/        # Glassmorphism project cards
│   └── Contact/         # Contact section with copy-to-clipboard email
├── store/
│   ├── index.ts         # Redux store configuration
│   └── slices/
│       ├── themeSlice.ts   # Light/Dark/High-Contrast theme state
│       └── uiSlice.ts      # Font size and accessibility state
├── styles/
│   ├── _variables.scss  # CSS variables for themes
│   ├── _mixins.scss     # SCSS mixins (responsive, flex, transitions)
│   └── global.scss      # Global styles and reset
├── types/
│   └── index.ts         # TypeScript interfaces and types
├── App.tsx              # Main app component
└── main.tsx             # Entry point with Redux Provider
```

## Features

### Implemented
- [x] Sticky Header with smooth scroll navigation
- [x] Font Resizer (A+/A-) updating `--base-font-size` CSS variable
- [x] Theme Toggles: Light / Dark / High-Contrast
- [x] Hero Section with animated tech stack icons
- [x] Timeline with staggered spring animations (Military olive, Education blue, Volunteer purple)
- [x] Projects Grid with glassmorphism cards and hover scale effects
- [x] Contact Section with click-to-copy email toast
- [x] Samsung-style scroll animations (`staggerChildren`, `spring` transitions)
- [x] Responsive design with mobile menu

### Pending / Future
- [ ] Backend: Node.js + Express API
- [ ] MongoDB integration for dynamic projects
- [ ] Floating accessibility button
- [ ] Project filtering by technology
- [ ] Blog section
- [ ] Dark mode persistence improvements

## Key Files to Edit

| Feature | File(s) |
|---------|---------|
| Navigation links | `src/components/Header/Header.tsx` |
| Personal info (name, subtitle) | `src/components/Hero/Hero.tsx` |
| Tech stack icons | `src/components/Hero/Hero.tsx` |
| Timeline events | `src/components/Timeline/Timeline.tsx` |
| Projects data | `src/components/Projects/Projects.tsx` |
| Contact info (email, socials) | `src/components/Contact/Contact.tsx` |
| Theme colors | `src/styles/_variables.scss` |
| Global styles | `src/styles/global.scss` |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Environment Variables

Create a `.env` file:

```env
VITE_MONGO_URI=mongodb://localhost:27017/portfolio
VITE_API_URL=http://localhost:3000/api
```

## Design Decisions

1. **No index.ts barrel files** - Direct imports from component files
2. **SCSS Modules** - Scoped styles per component
3. **CSS Variables** - Theme switching without re-render
4. **Spring animations** - `stiffness: 100, damping: 15` for premium feel
5. **Glassmorphism** - `backdrop-filter: blur(20px)` on project cards

## Code Style Preferences

- **Compact JSX** - Keep JSX elements on 1-2 lines when possible, avoid breaking each attribute to a new line
- **Framer Motion variants** - Animation logic stays in TSX files (cannot be moved to SCSS)
- **Smooth scrolling** - Uses both CSS `scroll-behavior: smooth` and JS `scrollIntoView({ behavior: 'smooth' })`
- **Links opening in new tab** - Always use `target="_blank" rel="noopener noreferrer"` for external links

## Claude Code Instructions

When working on this project:

1. **Read this README first** to understand the project structure
2. **Key files to modify**:
   - Personal info: `Hero.tsx` (name, tech stack with links)
   - Timeline data: `Timeline.tsx` (education, military, volunteer events)
   - Projects: `Projects.tsx` (project cards with GitHub/live links)
   - Contact: `Contact.tsx` (email, LinkedIn, GitHub URLs)
   - Styling: `src/styles/_variables.scss` for theme colors
3. **Animation variants** cannot be moved to SCSS - they must stay in TypeScript
4. **Tech stack icons** in Hero have `link` property for external URLs
5. **Timeline themes**: `military` (olive), `education` (blue), `volunteer` (purple)
6. **Run `npm run dev`** to start the development server on localhost:5173
