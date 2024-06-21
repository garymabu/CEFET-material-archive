import HoverRating from "./HoverRating";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";

interface MaterialUploadDialogProps {
  isUploadDialogOpen: boolean;
  closeUploadDialog: () => void;
}

export default function MaterialUploadDialog({ isUploadDialogOpen, closeUploadDialog }: MaterialUploadDialogProps) {
  return (
    <Dialog
      open={isUploadDialogOpen}
      onClose={closeUploadDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Novo material
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="normal"
          label="Nome do material"
          type="text"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="normal"
          label="Disciplina"
          type="text"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogContent>
        <TextField
          autoFocus
          required
          id="discipline"
          type="file"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeUploadDialog}>Fechar</Button>
        <Button onClick={closeUploadDialog}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
}