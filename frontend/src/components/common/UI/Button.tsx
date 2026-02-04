import React from 'react';

type Variant = 'primary' | 'outline' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[rgb(var(--color-primary))] text-white hover:opacity-95',
  outline: 'bg-transparent border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))]',
  danger: 'bg-red-600 text-white hover:opacity-95'
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', loading = false, children, className, ...rest }) => {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60';
  const classes = [base, variantClasses[variant], className].filter(Boolean).join(' ');

  return (
    <button {...rest} className={classes} disabled={loading || rest.disabled}>
      {loading && <span className="animate-spin inline-block mr-2 h-4 w-4 rounded-full border-b-2 border-white" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
