import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Whether to include top padding to avoid header overlap
   * Set to false for pages that have their own header/navigation
   */
  withHeaderSpacing?: boolean;
  /**
   * Maximum width constraint
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /**
   * Additional padding configuration
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * RTL support (enabled by default)
   */
  dir?: 'rtl' | 'ltr' | 'auto';
}

/**
 * Reusable PageContainer component that automatically handles header spacing
 * Prevents header overlap issues and provides consistent layout across pages
 * 
 * Features:
 * - Automatic header spacing calculation
 * - RTL support for Arabic content
 * - Responsive design
 * - Configurable padding and max-width
 * - Future-proof against header height changes
 */
const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  withHeaderSpacing = true,
  maxWidth = 'full',
  padding = 'md',
  dir = 'rtl',
  ...props
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-2',
    md: 'px-4',
    lg: 'px-6'
  };

  return (
    <div
      className={cn(
        'mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        withHeaderSpacing ? 'page-container' : 'page-container-no-top',
        className
      )}
      dir={dir}
      {...props}
    >
      {children}
    </div>
  );
};

export default PageContainer;