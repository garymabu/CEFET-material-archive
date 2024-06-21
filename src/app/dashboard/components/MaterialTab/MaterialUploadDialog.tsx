import { Material } from '@/app/entity/material.entity';
import { useAuthedMutation } from '@/app/hooks/useAuthedMutation.hook';
import { useAuthedQuery } from '@/app/hooks/useAuthedQuery.hook';
import { FileService } from '@/app/integration/cefet-material-archive/file/file.service';
import {
  CreateMaterialDto,
  MaterialService,
} from '@/app/integration/cefet-material-archive/material/material.service';
import { SubjectService } from '@/app/integration/cefet-material-archive/subject/user.service';
import { MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface MaterialUploadDialogProps {
  isUploadDialogOpen: boolean;
  closeUploadDialog: () => void;
}

export default function MaterialUploadDialog({
  isUploadDialogOpen,
  closeUploadDialog,
}: MaterialUploadDialogProps) {
  const fileService = new FileService();
  const materialService = new MaterialService();
  const subjectService = new SubjectService();
  const [newMaterial, setNewMaterial] = useState<{
    file: File;
    description: string;
    subjectId: number;
  }>();

  const {
    mutate: uploadFile,
    isSuccess: uploadSuccess,
    data: uploadData,
  } = useAuthedMutation((file: File) => fileService.uploadFile(file), {
    onSuccess: ({ data }) => {
      createMaterial({
        description: newMaterial?.description ?? '',
        subjectId: newMaterial?.subjectId ?? -1,
        dataUrl: data.url,
      });
    },
  });
  const { mutate: createMaterial, isSuccess: successfullCreateMaterial } =
    useAuthedMutation((newMaterial: CreateMaterialDto) =>
      materialService.createMaterial(newMaterial)
    );
  const { data } = useAuthedQuery('subjects', () => subjectService.getAll());

  const classes = data?.data ?? [];

  const { register, handleSubmit } = useForm({
    defaultValues: {
      description: '',
      subjectId: -1,
      file: new File([], ''),
    },
  });

  useEffect(() => {
    if (newMaterial) uploadFile(newMaterial.file);
  }, [newMaterial, uploadFile]);

  useEffect(() => {
    if (successfullCreateMaterial) closeUploadDialog();
  }, [successfullCreateMaterial, closeUploadDialog]);

  return (
    <Dialog
      open={isUploadDialogOpen}
      onClose={closeUploadDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form
        onSubmit={handleSubmit(({ description, file, subjectId }) => {
          setNewMaterial({
            description,
            file: (file as unknown as unknown[])[0] as File,
            subjectId,
          });
        })}
      >
        <DialogTitle id="alert-dialog-title">Novo material</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="normal"
            label="Nome do material"
            type="text"
            fullWidth
            variant="outlined"
            {...register('description')}
          />
        </DialogContent>
        <DialogContent>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            className="w-full"
            {...register('subjectId')}
          >
            {classes.map((subject) => (
              <MenuItem key={subject.id} value={subject.id}>
                {subject.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            required
            id="discipline"
            type="file"
            fullWidth
            {...register('file')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUploadDialog}>Fechar</Button>
          <Button type="submit">Confirmar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
