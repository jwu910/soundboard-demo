import { Button } from '@mui/material';
import { useRef } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

const SoundBoardButton = (props) => {
  const { label, buttonColor, textColor, ...otherProps } = props;

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
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
    <>
      <Button
        sx={{ backgroundColor: buttonColor, color: textColor }}
        variant="outlined"
        onClick={mediaBlobUrl ? handlePlayAudio : handleRecordToggle}
        {...otherProps}
      >
        {getButtonLabel(status, label)}
      </Button>
      <audio
        ref={newRef}
        style={{ visibility: 'hidden' }}
        id={mediaBlobUrl}
        src={mediaBlobUrl}
        controls
        type="audio/wav"
      />
    </>
  );
};

export default SoundBoardButton;
