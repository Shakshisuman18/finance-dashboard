# Finance Dashboard

A polished, responsive personal finance dashboard built with React and Vite for the Zorvyn Frontend Internship assessment.

## Overview
This project focuses on a modern personal finance experience centered around:

- tracking income, expenses, and savings
- visualizing spending patterns and budget health
- showcasing motion, theme switching, and responsive UI craft
- presenting strong frontend decision-making beyond static styling

## Features
- Responsive multi-section dashboard experience
- Light and dark mode with persistent theme preference
- Animated hero with finance-themed SVG motion
- Quick stats, recent transactions, and budget progress widgets
- Scroll-aware navigation with active section feedback
- Accessible motion handling with `prefers-reduced-motion` support
- Reusable card patterns and modular React components

## Tech Stack
- React
- Vite
- CSS Modules
- Lucide React

## Design Case Study

### Goal
The goal was to create a personal finance dashboard that feels premium, clear, and memorable enough to stand out in a frontend internship review. The design balances visual personality with usability, avoiding clutter while still feeling rich.

### Design Decisions
- **Glassmorphism surfaces:** used to create depth without overwhelming the layout
- **Soft finance palette:** teal, purple, white, and muted neutrals reinforce a calm, trustworthy product tone
- **Section-based storytelling:** the experience moves from overview, to budgeting, to reports, to goals in a clear narrative
- **Whitespace-first layout:** intentional spacing keeps the UI readable and improves perceived polish

### Motion Decisions
- **Hero heading reveal:** staggered text animation makes the first impression feel cinematic
- **Finance-themed SVG motion:** animated bars, path drawing, donut progress, and floating chips add life while staying relevant to the product
- **Subtle reveal interactions:** cards fade in gently on scroll and respond to hover with restrained motion
- **Reduced-motion support:** motion is disabled when the user prefers less animation

### Frontend Thinking
- **Reusable components:** stats, cards, transactions, and budget items are built as repeatable units instead of hardcoded blocks
- **Progressive enhancement:** theme persistence, active nav state, and animated counters improve the experience without backend dependency
- **Responsive layout:** components scale and reflow cleanly across mobile, tablet, and desktop sizes
- **Accessibility-minded choices:** skip link, readable contrast, reduced-motion support, and semantic sections improve usability

### What This Project Demonstrates
- UI sensitivity and visual hierarchy
- component-driven React structure
- motion design restraint
- responsive layout craftsmanship
- thoughtful product presentation for a finance use case

## Project Structure
```text
src/
  App.jsx
  App.module.css
  index.css
  assets/
```

## Run Locally
```bash
cd finance-dashboard
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Notes For Reviewers
- The UI is intentionally portfolio-oriented while staying grounded in a personal finance product.
- The implementation focuses on frontend quality: hierarchy, interaction, responsiveness, animation, and maintainability.
- The current version uses static financial content to emphasize interface and UX execution.
