import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

interface SubjectFilterInfo {
  name: string;
  date: string;
}

interface SubjectFilterProps {
  onFilter: () => void;
  setParams: (params: SubjectFilterInfo) => void;
}

export default function SubjectFilter({ onFilter, setParams }: SubjectFilterProps) {
  const { register, handleSubmit } = useForm<SubjectFilterInfo>({
    defaultValues: {
      name: '',
      date: '',
    },
  });

  return (
    <form onSubmit={handleSubmit((data: SubjectFilterInfo) => {
      setParams(data);
      onFilter();
    })}>
      <div className="flex flex-col gap-4 shadow-md p-4">
        <div className="flex gap-4">
          <TextField
            label="Nome"
            variant="outlined"
            size="small"
            className="w-1/4"
            {...register('name')}
          />
          <TextField
            variant="outlined"
            size="small"
            className="w-1/4"
            type="date"
            {...register('date')}
          />
        </div>
        <Button variant="contained" className="self-end" type="submit">
          Filtrar
        </Button>
      </div>
    </form>
  );
}