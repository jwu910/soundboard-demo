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
  const [buttons, setButtons] = useState([
    {
      label: 'Engineer',
      buttonColor: 'green',
      textColor: 'black',
    },
    {
      label: 'Scientist',
      buttonColor: 'red',
      textColor: 'black',
    },
    {
      label: 'Doctor',
      buttonColor: 'orange',
      textColor: 'black',
    },
    {
      label: 'Pharmacist',
      buttonColor: 'yellow',
      textColor: 'black',
    },
    {
      label: 'Software Engineer',
      buttonColor: 'white',
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
    setAnchorEl(null);
  };

  const handleTextColorChange = (color) => {
    setNewTextColor(color);
    setAnchorEl(null);
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

      // update local storage here

      setNewButtonColor('');
      setNewLabel('');
      setNewTextColor('');
    }
  };

  const isColorPickerOpen = Boolean(anchorEl);
  const id = isColorPickerOpen ? 'simple-popover' : undefined;

  //TODO: add a button preview in the form
  //TODO: persist data on refresh - probably local storage
  //TODO: add icon to indicate we still need to record
  return (
    <Container className="App">
      <Paper sx={{ p: 5 }}>
        <Typography variant="h2">Maywood 2022</Typography>

        <Card sx={{ p: 2, mb: 5 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <TextField
              label="Dream Job"
              value={newLabel}
              onInput={(val) => setNewLabel(val.target.value)}
            ></TextField>

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
              label={newLabel || 'Your New Button'}
              onClick={null}
            />
          </Stack>
        </Card>

        <Divider />
        {/* <Typography variant="h5">
          {' '}
          Press your button to record! Then press it again to play!{' '}
        </Typography> */}

        <Typography variant="h5">
          {' '}
          "When I grow up, I want to be (a/an) _______________"
        </Typography>

        <Stack
          sx={{
            mt: 2,
            display: 'inline-flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
          direction="row"
          spacing={2}
        >
          {buttons.length > 0 &&
            buttons.map((button, index) => {
              return (
                <SoundBoardButton
                  key={index}
                  buttonColor={button.buttonColor}
                  textColor={button.textColor}
                  label={button.label}
                  media={button.media}
                />
              );
            })}
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
