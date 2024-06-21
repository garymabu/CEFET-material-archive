import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import SubjectSelector from './SubjectSelector';
import { useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useAuthedQuery } from '@/app/hooks/useAuthedQuery.hook';
import { TeacherService } from '@/app/integration/cefet-material-archive/teacher/teacher.service';
import { SubjectService } from '@/app/integration/cefet-material-archive/subject/user.service';
import { MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuthedMutation } from '@/app/hooks/useAuthedMutation.hook';

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
  const { mutate } = useAuthedMutation(
    (data: { name: string; email: string }) =>
      teacherService.createTeacher(data),
    {}
  );
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
