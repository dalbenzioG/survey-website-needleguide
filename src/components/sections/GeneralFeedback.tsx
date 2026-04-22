import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

export interface GeneralFeedbackData {
  preferredTechnique: string;
  preferredTechniqueWhy: string;
  mostAccuratePosteriorCalyx: string;
  mostAccuratePosteriorCalyxWhy: string;
  clinicalChoice: string;
  clinicalChoiceWhy: string;
  easeLearnNeedleGuide: string;
  trainingRequiredBeforeClinical: string;
}

interface GeneralFeedbackProps {
  onDataChange: (data: GeneralFeedbackData) => void;
  initialData: GeneralFeedbackData;
}

const TECHNIQUE_OPTIONS = [
  { value: 'Freehand', label: 'Freehand' },
  { value: 'In-plane needle guide', label: 'In-plane needle guide' },
] as const;

const EASE_LEARN_OPTIONS = [
  'Very difficult',
  'Difficult',
  'Neutral',
  'Easy',
  'Very easy',
] as const;

const TRAINING_REQUIRED_OPTIONS = [
  'A great deal of training',
  'Considerable training',
  'Moderate training',
  'Little training',
  'Very little training',
] as const;

const GeneralFeedback: React.FC<GeneralFeedbackProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState<GeneralFeedbackData>(initialData);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleChange =
    (field: keyof GeneralFeedbackData) => (event: { target: { value: string } }) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const techniqueBlock = (
    title: string,
    field: 'preferredTechnique' | 'mostAccuratePosteriorCalyx' | 'clinicalChoice',
    whyField:
      | 'preferredTechniqueWhy'
      | 'mostAccuratePosteriorCalyxWhy'
      | 'clinicalChoiceWhy',
    whyLabel: string
  ) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="body1" gutterBottom fontWeight={500}>
        {title}
      </Typography>
      <RadioGroup name={field} value={formData[field]} onChange={handleChange(field)} sx={{ mb: 1 }}>
        {TECHNIQUE_OPTIONS.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
          />
        ))}
      </RadioGroup>
      <TextField
        fullWidth
        multiline
        minRows={2}
        label={whyLabel}
        value={formData[whyField]}
        onChange={handleChange(whyField)}
      />
    </Box>
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Post-Session Evaluation
      </Typography>

      {techniqueBlock(
        'Which technique did you prefer overall?',
        'preferredTechnique',
        'preferredTechniqueWhy',
        'Optional: Why?'
      )}

      {techniqueBlock(
        'With which technique do you feel you were most accurate in targeting the posterior calyx?',
        'mostAccuratePosteriorCalyx',
        'mostAccuratePosteriorCalyxWhy',
        'Optional: Why?'
      )}

      {techniqueBlock(
        'Which technique would you choose for a real clinical case, and why?',
        'clinicalChoice',
        'clinicalChoiceWhy',
        'Optional: Why?'
      )}

      <FormControl fullWidth sx={{ mb: 4 }} required>
        <InputLabel id="ease-learn-label">How easy was it to learn to use the needle guide?</InputLabel>
        <Select
          labelId="ease-learn-label"
          value={formData.easeLearnNeedleGuide}
          label="How easy was it to learn to use the needle guide?"
          onChange={handleChange('easeLearnNeedleGuide')}
        >
          {EASE_LEARN_OPTIONS.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }} required>
        <InputLabel id="training-required-label">
          How much training do you think would be required before clinical use?
        </InputLabel>
        <Select
          labelId="training-required-label"
          value={formData.trainingRequiredBeforeClinical}
          label="How much training do you think would be required before clinical use?"
          onChange={handleChange('trainingRequiredBeforeClinical')}
        >
          {TRAINING_REQUIRED_OPTIONS.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default GeneralFeedback;
