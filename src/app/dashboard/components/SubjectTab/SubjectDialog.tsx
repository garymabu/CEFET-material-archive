import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';

interface SubjectDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}

export default function SubjectDialog({
  isDialogOpen,
  closeDialog,
}: SubjectDialogProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      professorId: -1,
      term: -1,
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
      <form onSubmit={handleSubmit(() => {})}>
        <DialogTitle id="alert-dialog-title">Nova Disciplina</DialogTitle>
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
            {...register('professorId')}
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
            {...register('term')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Fechar</Button>
          <Button onClick={closeDialog}>Confirmar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
