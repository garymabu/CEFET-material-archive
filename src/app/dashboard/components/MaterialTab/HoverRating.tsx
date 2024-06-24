import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { use, useEffect, useState } from 'react';
import { useAuthedEffectfullMutation } from '@/app/hooks/useAuthedEffectfullMutation.hook';
import { MaterialService } from '@/app/integration/cefet-material-archive/material/material.service';

const labels: { [index: string]: string } = {
  0.5: 'Inutil',
  1: 'Inutil+',
  1.5: 'Pobre',
  2: 'Pobre+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Bom',
  4: 'Bom+',
  4.5: 'Excelente',
  5: 'Excelente+',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({
  materialId,
  refreshMaterials,
}: {
  materialId: number;
  refreshMaterials: () => void;
}) {
  const materialService = new MaterialService();
  const [value, setValue] = useState<number>();
  const [hover, setHover] = useState(-1);

  const { mutate } = useAuthedEffectfullMutation(
    () => materialService.rateMaterial(materialId, value ?? 0),
    {
      onSuccess: () => {
        refreshMaterials();
      },
    }
  );

  useEffect(() => {
    if (value) {
      mutate();
    }
  }, [value, mutate]);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px',
      }}
    >
      <p className="mb-2">Avaliação</p>
      <Rating
        name="hover-feedback"
        value={value ?? 0}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue ?? 0);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        className="mb-2"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value ?? 1]}</Box>
      )}
    </Box>
  );
}
