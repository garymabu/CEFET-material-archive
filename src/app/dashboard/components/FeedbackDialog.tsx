import HoverRating from "./HoverRating";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface FeedbackDialogProps {
  isFeedBackDialogOpen: boolean;
  closeFeedbackDialog: () => void;
}

export default function FeedbackDialog({ isFeedBackDialogOpen, closeFeedbackDialog }: FeedbackDialogProps) {
  return (
    <Dialog
      open={isFeedBackDialogOpen}
      onClose={closeFeedbackDialog}
      maxWidth="sm"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Nome do material
      </DialogTitle>
      <DialogContent className="flex justify-center">
        <HoverRating />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeFeedbackDialog}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}