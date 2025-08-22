interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

function Checkbox({ label, checked, onChange, className = "" }: CheckboxProps) {
  return (
    <label
      className={`flex items-center gap-3 cursor-pointer mb-6 ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
      />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}

export default Checkbox;
