import React from "react";

function FormInput({
  label,
  disabled,
  ...props
}: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-6">
      <label className={`block text-sm mb-2 ${disabled ? 'text-textMuted' : 'text-textSecondary'}`}>{label}</label>
      <input
        {...props}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg placeholder-textSecondary focus:outline-none ${
          disabled 
            ? 'bg-borderDefault text-textMuted cursor-not-allowed' 
            : 'bg-primaryColor text-textPrimary'
        }`}
      />
    </div>
  );
}

export default FormInput;
