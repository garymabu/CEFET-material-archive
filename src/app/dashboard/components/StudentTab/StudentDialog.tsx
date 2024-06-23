import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useAuthedMutation } from '@/app/hooks/useAuthedMutation.hook';
import {
  CreateUserDto,
  UserService,
} from '@/app/integration/cefet-material-archive/user/user.service';
import { useForm } from 'react-hook-form';
import { UserType } from '@/app/integration/cefet-material-archive/auth/auth.service';

interface StudentDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}

export default function StudentDialog({
  isDialogOpen,
  closeDialog,
}: StudentDialogProps) {
  const userService = new UserService();
  const { mutate: createStudent } = useAuthedMutation(
    (student: CreateUserDto) => userService.createUser(student),
    {
      onSuccess: () => {
        closeDialog();
      }
    }
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
        onSubmit={handleSubmit((item) =>
          createStudent({
            email: item.email,
            name: item.name,
            type: UserType.STUDENT,
          })
        )}
      >
        <DialogTitle id="alert-dialog-title">Novo Aluno</DialogTitle>
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
