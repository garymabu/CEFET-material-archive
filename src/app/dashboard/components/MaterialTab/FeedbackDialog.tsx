import { Material } from '@/app/entity/material.entity';
import HoverRating from './HoverRating';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface FeedbackDialogProps {
  isFeedBackDialogOpen: boolean;
  closeFeedbackDialog: () => void;
  material: Material;
  refreshMaterials: () => void;
}

export default function FeedbackDialog({
  isFeedBackDialogOpen,
  closeFeedbackDialog,
  material,
  refreshMaterials,
}: FeedbackDialogProps) {
  return (
    <Dialog
      open={isFeedBackDialogOpen}
      onClose={closeFeedbackDialog}
      maxWidth="sm"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{material?.description}</DialogTitle>
      <DialogContent className="flex justify-center items-center flex-col">
        <HoverRating
          refreshMaterials={refreshMaterials}
          materialId={material.id}
        />
        <a href={material?.dataUrl} target="_blank" rel="noreferrer">
          <Button variant="contained" color="primary">
            Visualizar
          </Button>
        </a>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeFeedbackDialog}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
