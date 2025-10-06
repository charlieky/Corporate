# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Forters Landing Page - A modern, responsive landing page for Forters, a Brazilian insurance brokerage specializing in financial lines with international presence. Built with Next.js 15, TypeScript, Tailwind CSS 4, and shadcn/ui components.

## Technology Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Package Manager**: npm

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Add shadcn/ui components
npx shadcn@latest add [component-name]
```

## Design System

### Color Palette
- **Primary**: Professional blue (oklch(0.45 0.15 240)) - Main brand color for buttons, links, and primary actions
- **Accent**: Lighter blue (oklch(0.55 0.18 240)) - Used for highlights and hover states
- **Secondary**: Light blue-gray (oklch(0.92 0.03 240)) - Background accents
- **Muted**: Very light blue (oklch(0.96 0.01 240)) - Subtle backgrounds

The color palette uses OKLCH color space for perceptually uniform colors across light and dark modes. The blue hue (240°) conveys trust and professionalism suitable for business insurance.

### Typography
- **Font**: Inter - Modern, corporate font with excellent readability
- Font is loaded via next/font/google with display swap for performance

### Component Guidelines
1. **Always use shadcn/ui components** for consistent design
2. **Always use Lucide React icons** - Import from `lucide-react` package
3. **Never use custom icons or other icon libraries** unless absolutely necessary

## Architecture

### File Structure
- `/app` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration and metadata
  - `page.tsx` - Main landing page with all sections
  - `globals.css` - Global styles and design tokens
- `/components/ui` - shadcn/ui components
- `/lib` - Utility functions (cn helper for class merging)

### Landing Page Sections (in order)
1. **Hero Section** - Main value proposition with CTA
2. **Features Section** - 4 key benefits (Shield, Globe, Cpu, Users icons)
3. **Products Section** - Professional liability insurance details
4. **Global Presence** - 5 office locations (Brasil, México, Colombia, USA, Others)
5. **Partners Section** - Insurance company logos (Chubb, Zurich, Allianz, Tokio Marine, Latú, Ezze)
6. **Contact Section** - Contact form with phone and email
7. **Footer** - Copyright notice

### Styling Patterns
- Use Tailwind utility classes for styling
- Responsive design: mobile-first with `md:` and `lg:` breakpoints
- Consistent spacing: `py-20` for section padding
- Container pattern: `container mx-auto px-4` for content width
- Cards use `border-2` with `hover:border-primary` for interactivity

## Content Language
All content is in **Portuguese (Brazilian)** - ensure any new content follows this convention.

## Adding New Components
When adding shadcn/ui components:
```bash
npx shadcn@latest add [component-name]
```

This will automatically:
- Install required dependencies
- Add component to `/components/ui`
- Configure with project's design tokens

## Key Considerations
1. **Performance**: Uses Turbopack for faster builds and hot reload
2. **SEO**: Metadata configured in `app/layout.tsx`
3. **Accessibility**: shadcn/ui components are built on Radix UI with ARIA compliance
4. **Type Safety**: Strict TypeScript configuration
5. **Icons**: All icons from Lucide React - check https://lucide.dev for available icons
