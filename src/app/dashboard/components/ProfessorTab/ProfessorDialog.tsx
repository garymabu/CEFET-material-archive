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
  const [subject, setSubject] = useState('');
  const [professorSubjects, setProfessorSubjects] = useState<ProfessorSubjects[]>([{id: 1, name: 'Matemática'}, {id: 2, name: 'Português'}, {id: 3, name: 'História'}]);
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
        <TableBody>
          {professorSubjects.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Apagar
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </DialogContent>
      <DialogContent>
        <SubjectSelector
          subject={subject}
          setSubject={setSubject}
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
