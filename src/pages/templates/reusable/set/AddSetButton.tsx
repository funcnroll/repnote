interface AddSetButtonProps {
  onClick: () => void;
}

function AddSetButton({ onClick }: AddSetButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-full gap-2 py-3 mt-4 font-medium transition duration-200 rounded-lg cursor-pointer bg-secondaryColor hover:bg-borderDefault text-textPrimary "
    >
      <span className="text-lg">+</span>
      Add Set
    </button>
  );
}

export default AddSetButton;
