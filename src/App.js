import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.scss';

import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Paper,
  Popover,
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
  const [buttons, setButtons] = useState([
    {
      label: 'Hello!',
      buttonColor: 'lightgreen',
      textColor: 'black',
    },
  ]);
  const [newLabel, setNewLabel] = useState('');
  const [newButtonColor, setNewButtonColor] = useState('');
  const [newTextColor, setNewTextColor] = useState('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setIsSaveEnabled(newButtonColor && newLabel && newTextColor);
  }, [newButtonColor, newLabel, newTextColor]);

  const handleColorPickerClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleButtonColorChange = (color) => {
    setNewButtonColor(color);
  };

  const handleTextColorChange = (color) => {
    setNewTextColor(color);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddNewButton = () => {
    if (newLabel && newButtonColor && newTextColor) {
      setButtons([
        ...buttons,
        {
          label: newLabel,
          buttonColor: newButtonColor,
          textColor: newTextColor,
        },
      ]);

      setNewButtonColor('');
      setNewLabel('');
      setNewTextColor('');
    }
  };

  const isColorPickerOpen = Boolean(anchorEl);
  const id = isColorPickerOpen ? 'simple-popover' : undefined;

  //TODO: add a button preview in the form
  //TODO: attach sound playback to buttons
  //TODO: persist data on refresh - probably local storage
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
            <Button
              id="colorButton"
              onClick={handleColorPickerClick}
              sx={{ minHeight: 56 }}
              variant="outlined"
            >
              Button Color
            </Button>
            <Popover
              id={id}
              open={isColorPickerOpen}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box sx={{ p: 2 }}>
                <CirclePicker
                  styles={{ padding: 4 }}
                  label="Color"
                  onChange={(color) =>
                    anchorEl.innerText === 'BUTTON COLOR'
                      ? handleButtonColorChange(color.hex)
                      : handleTextColorChange(color.hex)
                  }
                />
              </Box>
            </Popover>

            <Button
              id="colorText"
              onClick={handleColorPickerClick}
              sx={{ minHeight: 56 }}
              variant="outlined"
            >
              Text Color
            </Button>

            <TextField
              label="Button Label"
              value={newLabel}
              onInput={(val) => setNewLabel(val.target.value)}
            ></TextField>

            <Button
              sx={{ flexGrow: 1, minHeight: 56 }}
              onClick={handleAddNewButton}
              variant="contained"
              disabled={!isSaveEnabled}
            >
              Save
            </Button>
          </Stack>

          <Stack sx={{ mt: 4 }}>
            This is what your button will look like!
            <SoundBoardButton
              buttonColor={newButtonColor}
              textColor={newTextColor}
              label={newLabel}
              onClick={null}
            />
          </Stack>
        </Card>

        <Divider />

        <Stack sx={{ mt: 2 }}>
          {buttons.length > 0 &&
            buttons.map((button, index) => {
              return (
                <Stack key={index} sx={{ mb: 2 }} direction="row" spacing={4}>
                  <Typography variant="h6">{index + 1}</Typography>

                  <SoundBoardButton
                    buttonColor={button.buttonColor}
                    textColor={button.textColor}
                    label={button.label}
                    media={button.media}
                  />
                </Stack>
              );
            })}
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
