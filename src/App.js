import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.scss';

import {
  Button,
  Card,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import SoundBoardButton from './components/SoundBoardButton';

function App() {
  /* 
Build a sound board application
Students will be able to pick button color, button label, do a quick sound recording and save that
sound file to the button
These buttons probably will be a list of buttons that we can add to

Will need a form to collect information to push to buttons list


*/
  const [buttons, setButtons] = useState([{ label: 'Hello!', color: 'blue' }]);
  const [newLabel, setNewLabel] = useState('');
  const [newColor, setNewColor] = useState('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    setIsSaveEnabled(newColor && newLabel);
  }, [newColor, newLabel]);

  const handleAddNewButton = () => {
    // Need to add sound file still
    if (newLabel && newColor) {
      setButtons([...buttons, { label: newLabel, color: newColor }]);

      setNewColor('');
      setNewLabel('');
    }
  };


  //TODO: add a button preview in the form
  return (
    <Container className="App">
      <Paper sx={{ p: 5 }}>
        <Typography variant="h1">Sound Board Demo</Typography>

        <Card sx={{ p: 2, mb: 5 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <CirclePicker onChange={(color) => setNewColor(color.hex)} />

            <TextField
              flexItem
              label="Button Label"
              value={newLabel}
              onInput={(val) => setNewLabel(val.target.value)}
            ></TextField>

            <Button sx={{ minHeight: 56 }} flexItem variant="outlined">
              Record a Sound File
            </Button>

            <Button
              sx={{ flexGrow: 1, minHeight: 56 }}
              flexItem
              onClick={handleAddNewButton}
              variant="contained"
              disabled={!isSaveEnabled}
            >
              Save
            </Button>
          </Stack>
        </Card>

        <Divider />

        <Stack sx={{ mt: 2 }}>
          {buttons.length > 0 &&
            buttons.map((button, index) => (
              <Stack sx={{ mb: 2 }} direction="row" spacing={4}>
                <Typography variant="h6">{index + 1}</Typography>

                <SoundBoardButton
                  sx={{ my: 2 }}
                  key={index}
                  color={button.color}
                  label={button.label}
                />
              </Stack>
            ))}
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
