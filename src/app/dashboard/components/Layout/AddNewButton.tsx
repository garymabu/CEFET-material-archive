interface AddNewButtonProps {
  openDialog: () => void;
}

export default function AddNewButton({ openDialog }: AddNewButtonProps) {
  return (
    <button
      onClick={openDialog}
      className="self-end w-fit py-2 px-4 rounded bg-indigo-500 hover:bg-indigo-700 text-white text-base font-medium"
    >
      Adicionar novo
    </button>
  );
}