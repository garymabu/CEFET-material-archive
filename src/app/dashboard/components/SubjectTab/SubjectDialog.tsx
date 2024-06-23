import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { SubjectService } from '@/app/integration/cefet-material-archive/subject/user.service';
import { useAuthedMutation } from '@/app/hooks/useAuthedMutation.hook';
import { TeacherService } from '@/app/integration/cefet-material-archive/teacher/teacher.service';
import { useAuthedQuery } from '@/app/hooks/useAuthedQuery.hook';
import { MenuItem, Select } from '@mui/material';
import { Teacher } from '@/app/entity/teacher.entity';

interface SubjectDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}

export default function SubjectDialog({
  isDialogOpen,
  closeDialog,
}: SubjectDialogProps) {
  const subjectService = new SubjectService();
  const teacherService = new TeacherService();
  const {
    mutate,
  } = useAuthedMutation(
    ({teacherId,name,term}: {term:number, teacherId:number, name: string}) => subjectService.createSubject(
      {
        name,
        teacherId,
        term,
      }
    ),
    {
      onSuccess: () => {
        closeDialog()
      }
    }
  );
  const {
    data: allTeachers,
  } = useAuthedQuery(
    'teachers',
    () => 
      teacherService.getAllTeachers()
  )

  const allTeachersData : Teacher[] = allTeachers?.data || [];
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      teacherId: -1,
      term: 1,
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
      <form onSubmit={handleSubmit((vals) => {
        mutate(vals);
      })}>
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
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            className="w-full"
            {...register('teacherId')}
          >
            {allTeachersData.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.user.displayName}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Periodo"
            type="number"
            fullWidth
            variant="outlined"
            {...register('term')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Fechar</Button>
          <Button type='submit'>Confirmar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
