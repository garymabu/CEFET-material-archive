import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { TeacherService } from '@/app/integration/cefet-material-archive/teacher/teacher.service';
import { useForm } from 'react-hook-form';
import { useAuthedEffectfullMutation } from '@/app/hooks/useAuthedEffectfullMutation.hook';

interface ProfessorSubjects {
  id: number;
  name: string;
}

interface ProfessorDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}

export default function ProfessorDialog({
  isDialogOpen,
  closeDialog,
}: ProfessorDialogProps) {
  const teacherService = new TeacherService();
  const { mutate, isSuccess } = useAuthedEffectfullMutation(
    (data: { name: string; email: string }) =>
      teacherService.createTeacher(data)
  );

  useEffect(() => {
    if (isSuccess) closeDialog();
  }, [isSuccess, closeDialog]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
  });
  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      maxWidth="sm"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form
        onSubmit={handleSubmit((args) => {
          mutate(args);
        })}
      >
        <DialogTitle id="alert-dialog-title">Novo Professor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Nome"
            type="text"
            fullWidth
            variant="outlined"
            {...register('name')}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            {...register('email')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Fechar</Button>
          <Button type="submit">Confirmar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
