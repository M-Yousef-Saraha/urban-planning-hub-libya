# 🛠️ Component Editing Guide
## Urban Planning Hub Libya - Frontend Documentation

This guide explains how to edit and customize the basic components of the Urban Planning Hub Libya website, including the header, footer, hero, news, projects, contact form, layouts, and styling.

---

## 📋 Table of Contents

1. Project Structure Overview
2. Component Architecture
3. Hero Components
4. Header Component
5. Footer Component
6. Hero Section
7. News Components
8. Projects Components
9. Contact Form
10. Page Layouts
11. Styling System
12. Adding New Components
13. Best Practices
14. Quick Reference & Troubleshooting

---

## 🏗️ Project Structure Overview

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui primitives
│   ├── home/            # Homepage-specific components
│   ├── layout/          # Layout helpers (PageContainer)
│   └── common/          # Shared components
├── pages/               # Page components (News, Projects, etc.)
├── contexts/            # React contexts
├── hooks/               # Custom hooks
├── lib/                 # Utilities & API layer
└── index.css            # Global styles & design tokens
```

---

## 🧩 Component Architecture

Types of components:
- UI primitives (`src/components/ui/`)
- Layout helpers (`src/components/layout/`)
- Feature components (`src/components/`)
- Page components (`src/pages/`)

Recommended structure:
```tsx
import React from 'react'

interface ComponentNameProps {
  // props here
}

const ComponentName: React.FC<ComponentNameProps> = ({}) => {
  return (
    <div className="component-wrapper">{/* content */}</div>
  )
}

export default ComponentName
```

---

## 🧭 Header Component

### Location
- File: `src/components/Header.tsx`

### Edit navigation
```tsx
const navItems = [
  { name: 'الرئيسية', href: '/' },
  { name: 'المكتبة الرقمية', href: '/library' },
  { name: 'من نحن', href: '/about' },
  { name: 'الخدمات', href: '/services' },
  { name: 'المشاريع', href: '/projects' },
  { name: 'الأخبار', href: '/news' },
  { name: 'معايير التخطيط العمراني', href: '/standards' },
  { name: 'الفروع', href: '/branches' },
  { name: 'الاتصال', href: '/#contact' },
]
```

### Update logo
```tsx
<img src="/updated-logo.png" alt="شعار الهيئة" className="h-14 md:h-16 w-auto object-contain" />
```

### Styling
- Edit classes on the `<header>` and `<Link>` elements to adjust background, shadows, and hover states.

---

## 🦶 Footer Component

### Location
- File: `src/components/Footer.tsx`

### Edit contact information
Look for the contact blocks and update phone, email, address, website, and working hours.

### Quick links
```tsx
const quickLinks = [
  { name: 'الرئيسية', href: '/' },
  { name: 'المكتبة الرقمية', href: '/library' },
  { name: 'من نحن', href: '/about' },
  // ...
]
```

### Social links
```tsx
const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  // ...
]
```

---

## 🎯 Hero Section

### Location
- File: `src/components/Hero.tsx`

### Edit titles and CTAs
Update the `<h2>` content and the button labels/links in the CTA block.

### Background accents
Adjust or remove the decorative icons/animations inside the background container.

---

## 📰 News Components

### Files
- Homepage preview: `src/components/NewsSection.tsx`
- News page: `src/pages/News.tsx`
- Card: `src/components/NewsCard.tsx`
- Detail: `src/components/NewsDetail.tsx`

### Data structure (card/detail)
```ts
interface NewsArticle {
  id: number
  title: string
  summary: string
  content: string
  image: string
  publishDate: string
  readTime: string
  views: number
  author: string
  category: string
  tags: string[]
  featured?: boolean
}
```

### Categories (News page)
Update the `categories` array in `src/pages/News.tsx` to add/remove categories.

### Empty state
The News page is prepared with an empty state until real data is loaded from the backend.

---

## 🏗️ Projects Components

### Files
- Homepage preview: `src/components/ProjectsSection.tsx`
- Projects page: `src/pages/Projects.tsx`

### Data structure (Projects page)
```ts
interface Project {
  id: number
  title: string
  location: string
  description: string
  status: 'in_progress' | 'planning' | 'on_hold' | 'completed' | string
  start_date: string
  beneficiaries: number
  image_url?: string
}
```

### Status helpers
`getStatusColor(status)` and `getStatusText(status)` map API/status values to Arabic labels and badge colors. Edit these to adjust display.

### States
The Projects page includes loading, error, and empty states and is ready for API integration.

---

## 📞 Contact Form

### Location
- File: `src/components/ContactSection.tsx`

### Edit fields
Update the `formData` state and the JSX inputs to add/remove fields (e.g., phone, subject). Validation can be added in `handleSubmit` or via a schema.

### Contact info
Update the `contactInfo` array entries (icons, titles, details, links).

---

## 📄 Page Layouts

### Layout helper
- `src/components/layout/PageContainer.tsx` provides consistent spacing and header overlap safety.

### Typical page pattern
```tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageContainer from '@/components/layout/PageContainer'

export default function YourPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <section className="bg-white py-12 md:py-16 border-b border-gray-100">
        <PageContainer className="max-w-4xl text-center">{/* hero */}</PageContainer>
      </section>
      <section className="py-12 md:py-16">
        <PageContainer>{/* content */}</PageContainer>
      </section>
      <Footer />
    </div>
  )
}
```

---

## 🎨 Styling System

### Global tokens (in `src/index.css`)
CSS variables define colors, radii, and shared values:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 210 90% 56%;
  --secondary: 210 40% 96%;
  --muted: 210 40% 96%;
  --accent: 210 40% 96%;
  --destructive: 0 72% 46%;
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 210 90% 56%;
  --radius: 0.5rem;
}
```

### Helpful utilities
- `.modern-card` → shared card style
- `.hover-lift` / `.hover-scale` → hover effects
- `.animate-fade-in-up` / `.animate-slide-in-top` / `.animate-float` → animations
- `.page-container`, `.header-safe-padding` → spacing helpers

### Customize colors
Edit the HSL variables in `:root` to change theme colors.

---

## ➕ Adding New Components

1) Create a new file under `src/components/`.
2) Export the component and import where needed.
3) Use `PageContainer` for consistent spacing if it's a full-width section.
4) Add a route in `src/App.tsx` if it represents a new page.

Minimal template:
```tsx
import React from 'react'

interface Props { title: string; description?: string }

const YourComponent: React.FC<Props> = ({ title, description }) => (
  <div className="modern-card p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    {description && <p className="text-gray-600">{description}</p>}
  </div>
)

export default YourComponent
```

---

## ✅ Best Practices

- Keep components focused and typed (TypeScript interfaces)
- Use Tailwind classes and shared utilities for consistency
- Maintain RTL support (`dir="rtl"` on page roots)
- Optimize images (dimensions, compression)
- Provide loading/empty/error states for data-driven pages
- Favor accessible markup (ARIA labels, semantic elements)

---

## 🧭 Quick Reference

| Task | File | How |
| ---- | ---- | --- |
| Update hero images | `src/components/HeroImageSection.tsx` | Edit image path in component |
| Change navigation | `src/components/Header.tsx` | Update `navItems` |
| Update contact info | `src/components/Footer.tsx` | Edit contact blocks and links |
| Add new page | `src/pages/` + `src/App.tsx` | Create page and route |
| Tweak colors | `src/index.css` | Update CSS variables |

### Troubleshooting
- Images not loading → verify file exists under `/public` and path starts with `/images/`.
- Styling not applied → check Tailwind class names and global imports.
- RTL issues → ensure top-level container has `dir="rtl"`.
- Component not rendering → verify imports/exports and routes.

---

Last updated: September 2025
Version: 1.0.0


