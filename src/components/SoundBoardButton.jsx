import { Button } from '@mui/material';

const SoundBoardButton = (props) => {
  const { label, color } = props;

  return (
    <Button sx={{ backgroundColor: color }} variant="outline">
      {label}
    </Button>
  );
};

export default SoundBoardButton;
