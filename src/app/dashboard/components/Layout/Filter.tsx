import { useForm } from 'react-hook-form';

interface MaterialSeachInfo {
  name: string;
  createdAt: Date;
}

export default function Filter() {
  const { register, handleSubmit, reset } = useForm<MaterialSeachInfo>();

  function handleSearch(data: MaterialSeachInfo) {
    console.log(data);
    reset();
  }

  return (
    <form
      className="flex flex-col justify-center items-start p-4 border border-solid rounded-md"
      onSubmit={handleSubmit(handleSearch)}
    >
      <div className="flex justify-center items-start gap-8">
        <div className="flex flex-col justify-center items-start">
          <label className="text-sm">Nome</label>
          <input
            className="w-44 p-1 border border-gray-300 rounded-sm"
            type="text"
            {...register('name')}
          />
        </div>
        <div className="flex flex-col justify-center items-start">
          <label className="text-sm">Data de entrada</label>
          <input
            className="w-44 p-1 border border-gray-300 rounded-sm"  
            type="date"
            {...register('createdAt')}
          />
        </div>
      </div>
      <button
        type="submit"
        className="self-end rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm bg-sky-500 text-white"
      >
        Buscar
      </button>
    </form>
  );
}
