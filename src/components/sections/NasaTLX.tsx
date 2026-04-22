import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider, Paper } from '@mui/material';

export interface NasaTLXData {
  freehand: number[];
  inPlaneGuide: number[];
}

interface NasaTLXProps {
  onDataChange: (data: NasaTLXData) => void;
  initialData: NasaTLXData;
}

type ConditionKey = keyof NasaTLXData;

const sliderSx = {
  '& .MuiSlider-markLabel': {
    fontSize: '0.75rem',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
  },
  '& .MuiSlider-markLabel[data-index="0"]': {
    transform: 'translateX(0)',
  },
  '& .MuiSlider-markLabel[data-index="20"]': {
    transform: 'translateX(-100%)',
  },
  '& .MuiSlider-mark': {
    width: '2px',
    height: '8px',
    backgroundColor: 'currentColor',
  },
  '& .MuiSlider-mark[data-index="0"], & .MuiSlider-mark[data-index="10"], & .MuiSlider-mark[data-index="20"]': {
    width: '3px',
    height: '16px',
  },
} as const;

const NasaTLX: React.FC<NasaTLXProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState<NasaTLXData>(initialData);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleSliderChange =
    (index: number, condition: ConditionKey) => (_: Event, newValue: number | number[]) => {
      const v = Array.isArray(newValue) ? newValue[0] : newValue;
      setFormData((prev) => ({
        ...prev,
        [condition]: prev[condition].map((val, i) => (i === index ? v : val)),
      }));
    };

  const scales = [
    {
      name: 'Mental Demand',
      mainQuestion: 'How mentally demanding was the task?',
      subQuestion: 'How much concentration or thinking was needed?',
      minLabel: 'Very Low',
      maxLabel: 'Very High',
    },
    {
      name: 'Physical Demand',
      mainQuestion: 'How physically demanding was the task?',
      subQuestion: 'Did you need to make repeated needle redirections or reinsertions?',
      minLabel: 'Very Low',
      maxLabel: 'Very High',
    },
    {
      name: 'Temporal Demand',
      mainQuestion:
        'Did you feel like the process was efficient or took longer than expected?',
      subQuestion: 'How hurried or rushed was the pace of the task?',
      minLabel: 'Very slow',
      maxLabel: 'Very fast',
    },
    {
      name: 'Performance',
      mainQuestion: 'How successful were you in accomplishing what you were asked to do?',
      subQuestion:
        'How happy are you with how you performed? Did it feel accurate and correct?',
      minLabel: 'Very Poor Performance',
      maxLabel: 'Excellent Performance',
    },
    {
      name: 'Effort',
      mainQuestion: 'How hard did you have to work to accomplish your level of performance?',
      subQuestion: 'Was the task straightforward or did it require significant effort?',
      minLabel: 'No Effort Required',
      maxLabel: 'Extreme Effort Required',
    },
    {
      name: 'Frustration',
      mainQuestion:
        'How insecure, discouraged, irritated, stressed, and annoyed were you?',
      subQuestion:
        'Were there any moments that made you feel irritated or confused? How much did you feel frustrated or stressed during the task?',
      minLabel: 'Not Frustrated at all',
      maxLabel: 'Extremely Frustrated',
    },
  ];

  const marksFor = (index: number) =>
    Array.from({ length: 21 }, (_, i) => ({
      value: i,
      label:
        i === 0
          ? scales[index].minLabel
          : i === 20
            ? scales[index].maxLabel
            : undefined,
    }));

  const techniqueBlocks: { label: string; condition: ConditionKey }[] = [
    { label: 'Freehand Technique', condition: 'freehand' },
    { label: 'In-Plane Guide', condition: 'inPlaneGuide' },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        NASA-TLX Assessment
      </Typography>
      <Typography variant="body1" paragraph>
        Please rate your experience with each technique on the following scales.
      </Typography>

      {scales.map((scale, index) => (
        <Paper key={scale.name} elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              mb: 1,
              flexWrap: 'nowrap',
            }}
          >
            <Typography
              variant="h6"
              sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', flexShrink: 0 }}
            >
              {scale.name} —
            </Typography>
            <Typography
              variant="body1"
              sx={{
                flex: 1,
                minWidth: 0,
                whiteSpace: 'normal',
                lineHeight: 1.4,
              }}
            >
              {scale.mainQuestion}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {scale.subQuestion}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            {techniqueBlocks.map(({ label, condition }) => (
              <Box key={condition}>
                <Typography variant="subtitle1" gutterBottom>
                  {label}:
                </Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={formData[condition][index]}
                    onChange={handleSliderChange(index, condition)}
                    valueLabelDisplay="auto"
                    step={1}
                    marks={marksFor(index)}
                    min={0}
                    max={20}
                    sx={sliderSx}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default NasaTLX;
