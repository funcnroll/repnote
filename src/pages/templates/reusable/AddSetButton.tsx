interface AddSetButtonProps {
  onClick: () => void;
}

function AddSetButton({ onClick }: AddSetButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 rounded-lg bg-gray-600 hover:bg-gray-700 text-gray-200 hover:text-white font-medium transition duration-200 flex items-center justify-center gap-2 mt-4 cursor-pointer"
    >
      <span className="text-lg">+</span>
      Add Set
    </button>
  );
}

export default AddSetButton;
