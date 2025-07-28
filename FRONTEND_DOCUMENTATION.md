# Frontend Documentation - Urban Planning Website

## Project Overview

This is a React-based frontend application for an Urban Planning Ministry website with a document request system. The project is built with TypeScript, Tailwind CSS, and modern React patterns.

## Tech Stack

- **Framework:** React 18.3.1 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + Custom Components
- **Routing:** React Router DOM v6
- **State Management:** React hooks + Context
- **Icons:** Lucide React
- **Notifications:** Sonner Toast
- **HTTP Client:** Fetch API
- **Form Handling:** React Hook Form

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui components
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── NewsSection.tsx
│   ├── ProjectsSection.tsx
│   └── ServicesSection.tsx
├── pages/               # Route components
│   ├── Index.tsx        # Main homepage
│   ├── Library.tsx      # Document library
│   └── NotFound.tsx     # 404 page
├── lib/                 # Utility functions
│   ├── utils.ts         # Common utilities
│   └── emailService.ts  # Email service
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── App.tsx              # App root component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## Component Documentation

### Main Layout Components

#### Header Component
**File:** `src/components/Header.tsx`
**Purpose:** Navigation header with responsive menu
**Features:**
- Logo and branding
- Navigation menu (desktop/mobile)
- Responsive hamburger menu
- Link to library page

#### Footer Component
**File:** `src/components/Footer.tsx`
**Purpose:** Website footer with contact info and links
**Features:**
- Company information
- Contact details
- Social media links
- Copyright notice

### Homepage Sections

#### Hero Component
**File:** `src/components/Hero.tsx`
**Purpose:** Main hero section with call-to-action
**Features:**
- Hero title and description
- Background gradient
- CTA buttons
- Statistics display

#### NewsSection Component
**File:** `src/components/NewsSection.tsx`
**Purpose:** Display latest news articles
**Features:**
- News grid layout
- Article cards with images
- Read more functionality
- Responsive design

**Data Structure:**
```typescript
interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}
```

#### AboutSection Component
**File:** `src/components/AboutSection.tsx`
**Purpose:** About the ministry information
**Features:**
- Mission statement
- Key features grid
- Vision and values

#### ServicesSection Component
**File:** `src/components/ServicesSection.tsx`
**Purpose:** Display available services
**Features:**
- Service cards grid
- Icons and descriptions
- Call-to-action buttons

**Data Structure:**
```typescript
interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  accentColor: string;
}
```

#### ProjectsSection Component
**File:** `src/components/ProjectsSection.tsx`
**Purpose:** Showcase current projects
**Features:**
- Project cards with progress bars
- Status indicators
- Location and beneficiary info

**Data Structure:**
```typescript
interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  status: string;
  progress: number;
  startDate: string;
  beneficiaries: number;
}
```

#### ContactSection Component
**File:** `src/components/ContactSection.tsx`
**Purpose:** Contact form and information
**Features:**
- Contact form with validation
- Contact information display
- Toast notifications
- Form state management

**Form Structure:**
```typescript
interface ContactForm {
  name: string;
  email: string;
  message: string;
}
```

### Library Page Components

#### Library Component
**File:** `src/pages/Library.tsx`
**Purpose:** Document library with request system
**Features:**
- Document search and filtering
- Document grid display
- Request modal form
- Category filtering

**Data Structures:**
```typescript
interface Document {
  id: string;
  title: string;
  category: string;
  description: string;
  type: string;
  size: string;
  dateAdded: string;
  downloadCount: number;
  tags: string[];
}

interface DocumentRequest {
  documentId: string;
  documentTitle: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  purpose: string;
  urgency: 'low' | 'medium' | 'high';
  additionalNotes: string;
}
```

## Service Integration

### Email Service
**File:** `src/lib/emailService.ts`
**Purpose:** Handle document request emails

**API Integration:**
```typescript
class EmailService {
  async sendDocumentRequest(requestData: DocumentRequestData): Promise<boolean> {
    // Send POST request to Laravel backend
    const response = await fetch('/api/document-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });
    return response.ok;
  }
}
```

## Styling System

### Design Tokens
The project uses a semantic design system defined in `src/index.css`:

```css
:root {
  /* Colors */
  --primary: 217 91% 60%;      /* Blue primary */
  --secondary: 142 76% 36%;    /* Green secondary */
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)));
  
  /* Animations */
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### CSS Classes
- `.modern-card`: Standard card styling with hover effects
- `.glass-effect`: Glass morphism effect
- `.hover-lift`: Hover animation with scale
- `.fade-in-up`: Slide-up animation
- `.gradient-text`: Gradient text effect

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## State Management Patterns

### Component State
Use `useState` for local component state:
```typescript
const [formData, setFormData] = useState<ContactForm>({
  name: '',
  email: '',
  message: ''
});
```

### Form Handling
Use controlled components with event handlers:
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};
```

### Error Handling
Use toast notifications for user feedback:
```typescript
const { toast } = useToast();

toast({
  title: "نجح الإرسال",
  description: "تم إرسال رسالتك بنجاح",
});

// Error toast
toast({
  title: "خطأ",
  description: "حدث خطأ أثناء الإرسال",
  variant: "destructive"
});
```

## API Integration Guidelines

### Base URL Configuration
Create an API configuration file:
```typescript
// src/lib/api.ts
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://yoursite.com/api' 
  : 'http://localhost:8000/api';

export const apiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
```

### Fetch Wrapper
Create a reusable fetch function:
```typescript
// src/lib/api.ts
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = apiUrl(endpoint);
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}
```

### Using React Query (Recommended)
For better data fetching, use React Query:
```typescript
// Install: npm install @tanstack/react-query

// Hook example
function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: () => apiRequest<NewsResponse>('/news')
  });
}

// Usage in component
const { data: news, isLoading, error } = useNews();
```

## Component Development Guidelines

### 1. Component Structure
```typescript
interface ComponentProps {
  // Define props with TypeScript
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State and hooks
  
  // Event handlers
  
  // Effects
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default Component;
```

### 2. Event Handling
```typescript
// Form events
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Handle form submission
};

// Input events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Handle input change
};

// Click events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // Handle button click
};
```

### 3. Conditional Rendering
```typescript
// Simple condition
{isLoading && <div>Loading...</div>}

// Ternary operator
{error ? <ErrorMessage /> : <Content />}

// Logical AND with fallback
{data?.length > 0 ? (
  data.map(item => <Item key={item.id} data={item} />)
) : (
  <EmptyState />
)}
```

### 4. List Rendering
```typescript
{items.map(item => (
  <div key={item.id} className="item">
    {item.title}
  </div>
))}
```

## Performance Optimization

### 1. Code Splitting
Use lazy loading for routes:
```typescript
import { lazy, Suspense } from 'react';

const Library = lazy(() => import('./pages/Library'));

// In routes
<Route 
  path="/library" 
  element={
    <Suspense fallback={<div>Loading...</div>}>
      <Library />
    </Suspense>
  } 
/>
```

### 2. Memoization
Use React.memo for expensive components:
```typescript
const ExpensiveComponent = React.memo(({ data }) => {
  // Expensive rendering logic
  return <div>{/* Complex JSX */}</div>;
});
```

### 3. useCallback for Event Handlers
```typescript
const handleClick = useCallback((id: string) => {
  // Handler logic
}, [dependency]);
```

### 4. Image Optimization
```typescript
<img 
  src={imageSrc}
  alt={altText}
  loading="lazy"
  className="w-full h-auto"
/>
```

## Accessibility Guidelines

### 1. Semantic HTML
```typescript
<article>
  <header>
    <h2>Article Title</h2>
  </header>
  <main>
    <p>Article content...</p>
  </main>
</article>
```

### 2. ARIA Attributes
```typescript
<button 
  aria-label="Close modal"
  aria-expanded={isOpen}
  onClick={handleClose}
>
  ×
</button>
```

### 3. Focus Management
```typescript
<input
  ref={inputRef}
  onFocus={() => setFocused(true)}
  onBlur={() => setFocused(false)}
/>
```

### 4. Color Contrast
Ensure all text meets WCAG AA standards (4.5:1 ratio).

## Internationalization (RTL Support)

The app supports Arabic (RTL) layout:

### 1. Text Direction
```typescript
<div dir="rtl" className="text-right">
  Arabic content
</div>
```

### 2. Tailwind RTL Classes
```css
/* Use space-x-reverse for RTL spacing */
.flex.space-x-2.space-x-reverse

/* Use ml/mr appropriately */
.ml-2  /* margin-left */
.mr-2  /* margin-right */
```

### 3. Date Formatting
```typescript
new Date().toLocaleDateString('ar-SA', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
```

## Building and Deployment

### Development
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Environment Variables
Create `.env.local` for local development:
```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Urban Planning Ministry
```

### Production Build
```bash
npm run build
# Outputs to dist/ folder
```

## Testing Guidelines

### Unit Testing
Use Vitest for unit tests:
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Component from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Integration Testing
Test component interactions:
```typescript
import { fireEvent, waitFor } from '@testing-library/react';

it('handles form submission', async () => {
  render(<ContactForm />);
  
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'John Doe' }
  });
  
  fireEvent.click(screen.getByText('Submit'));
  
  await waitFor(() => {
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });
});
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Common Issues and Solutions

### 1. CORS Issues
Configure your Laravel backend for CORS:
```php
// config/cors.php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:5173'], // Vite dev server
```

### 2. Build Errors
Common TypeScript errors:
- Check import paths
- Verify prop types
- Ensure all dependencies are installed

### 3. Styling Issues
- Use design system tokens instead of arbitrary values
- Check for RTL layout compatibility
- Verify responsive behavior

## Contributing Guidelines

### 1. Code Style
- Use TypeScript strictly
- Follow component patterns
- Write meaningful commit messages
- Add comments for complex logic

### 2. File Naming
- Components: PascalCase (e.g., `ContactForm.tsx`)
- Utils: camelCase (e.g., `apiHelpers.ts`)
- Pages: PascalCase (e.g., `Library.tsx`)

### 3. Import Organization
```typescript
// External imports
import React from 'react';
import { useState } from 'react';

// Internal imports
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/api';
```

This documentation provides a complete reference for maintaining and extending the frontend application. Update this document as the project evolves.