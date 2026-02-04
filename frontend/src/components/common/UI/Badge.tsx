import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantMap: Record<BadgeVariant, string> = {
  default: 'bg-[rgb(var(--color-border))] text-[rgb(var(--color-text))]',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-400 text-black',
  danger: 'bg-red-500 text-white'
};

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const classes = ['inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full', variantMap[variant]].join(' ');
  return <span className={classes}>{children}</span>;
};

export default Badge;
