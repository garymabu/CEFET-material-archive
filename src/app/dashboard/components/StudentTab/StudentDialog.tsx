import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface StudentDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}

export default function StudentDialog({
  isDialogOpen,
  closeDialog,
}: StudentDialogProps) {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      maxWidth="sm"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Novo material</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          label="Nome"
          type="text"
          fullWidth
          variant="outlined"
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Fechar</Button>
        <Button onClick={closeDialog}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
}
