import React from "react";

function FormInput({
  label,
  ...props
}: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-6">
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-lg bg-primaryColor placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}

export default FormInput;
