import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

interface Subject {
  name: string
}

interface SubjectSelectorProps {
  subject: string;
  setSubject: (subject: string) => void;
}

export default function SubjectSelector({ subject, setSubject }: SubjectSelectorProps) {
  const [classes, setClasses] = useState<Subject[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setSubject(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Disciplina</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subject}
          label="Age"
          onChange={handleChange}
        >
          {classes.map((subject) => (
            <MenuItem value={subject.name}>{subject.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}