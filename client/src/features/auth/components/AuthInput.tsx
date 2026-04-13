"use client";

import React, { InputHTMLAttributes } from 'react';

// Combine standard input props with our custom `label` prop
type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string; // Make id required for accessibility (linking label to input)
};

const AuthInput = ({ label, id, ...props }: AuthInputProps) => {
  return (
    <div className="mb-4"> {/* Consistent bottom margin for all fields */}
      <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-1">
        {label}
      </label>
      <input
        id={id}
        className="w-full px-3 py-2 bg-primary border border-border-subtle rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors"
        {...props}
      />
    </div>
  );
};

export default AuthInput;