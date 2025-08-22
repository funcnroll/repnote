import React from "react";

function FormInput({
  label,
  disabled,
  ...props
}: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-6">
      <label className={`block text-sm mb-2 ${disabled ? 'text-gray-500' : 'text-gray-400'}`}>{label}</label>
      <input
        {...props}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none ${
          disabled 
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
            : 'bg-primaryColor text-white'
        }`}
      />
    </div>
  );
}

export default FormInput;
