import { PlayArrow, Headphones } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useRef } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

const SoundBoardButton = (props) => {
  const { label, buttonColor, textColor, ...otherProps } = props;

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false });

  const newRef = useRef();

  const handlePlayAudio = () => {
    const button = document.getElementById(mediaBlobUrl);
    button && button.play();
  };

  const handleRecordToggle = () => {
    if (status === 'idle') {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const getButtonLabel = (recordingStatus, label) => {
    if (recordingStatus === 'recording') {
      return 'Recording';
    } else {
      return label;
    }
  };

  return (
    <Box>
      <Button
        sx={{ backgroundColor: buttonColor, color: textColor }}
        variant="outlined"
        onClick={mediaBlobUrl ? handlePlayAudio : handleRecordToggle}
        {...otherProps}
      >
        {getButtonLabel(status, label)}
        {!mediaBlobUrl ? <Headphones /> : <PlayArrow />}
      </Button>
      <audio
        ref={newRef}
        style={{ visibility: 'hidden', width: 0 }}
        id={mediaBlobUrl}
        src={mediaBlobUrl}
        controls
        type="audio/wav"
      />
    </Box>
  );
};

export default SoundBoardButton;
