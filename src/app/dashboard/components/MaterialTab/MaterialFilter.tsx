import { useAuthedEffectfullQuery } from "@/app/hooks/useAuthedEffectfullQuery.hook";
import { SubjectService } from "@/app/integration/cefet-material-archive/subject/subject.service";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

interface MaterialFilterInfo {
  name: string;
  subjectId: number;
}

interface MaterialFilterProps {
  onFilter: () => void;
  setParams: (params: MaterialFilterInfo) => void;
}

export default function MaterialFilter({ onFilter, setParams }: MaterialFilterProps) {
  const subjectService = new SubjectService();

  const { data } = useAuthedEffectfullQuery('subjects', () =>
    subjectService.getAll()
  );
  const classes = data?.data ?? [];

  const { register, handleSubmit } = useForm<MaterialFilterInfo>({
    defaultValues: {
      name: '',
      subjectId: -1,
    },
  });

  return (
    <form onSubmit={handleSubmit((data: MaterialFilterInfo) => {
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
            {classes.map((subject) => (
              <MenuItem key={subject.id} value={subject.id}>
                {subject.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button variant="contained" className="self-end" type="submit">
          Filtrar
        </Button>
      </div>
    </form>
  );
}