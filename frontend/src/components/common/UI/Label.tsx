import React from 'react';

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-medium mb-1 text-[rgb(var(--color-muted))]">
      {children}
    </label>
  );
};

export default Label;
