import { useAuthedEffectfullQuery } from "@/app/hooks/useAuthedEffectfullQuery.hook";
import { SubjectService } from "@/app/integration/cefet-material-archive/subject/subject.service";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

interface ProfessorFilterInfo {
  name: string;
  subjectId: number;
  date: string;
}

interface ProfessorFilterProps {
  onFilter: () => void;
  setParams: (params: ProfessorFilterInfo) => void;
}

export default function ProfessorFilter({ onFilter, setParams }: ProfessorFilterProps) {
  const subjectService = new SubjectService();

  const { data } = useAuthedEffectfullQuery('subjects', () =>
    subjectService.getAll()
  );

  const subjects = data?.data ?? [];

  const { register, handleSubmit } = useForm<ProfessorFilterInfo>({
    defaultValues: {
      name: '',
      subjectId: -1,
      date: '',
    },
  });

  return (
    <form onSubmit={handleSubmit((data: ProfessorFilterInfo) => {
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
          <Select
            label="Disciplina"
            variant="outlined"
            size="small"
            className="w-1/4"
            {...register('subjectId')}
          >
            {subjects.map((subject) => (
              <MenuItem key={subject.id} value={subject.id}>
                {subject.name}
              </MenuItem>
            ))}
          </Select>
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