import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export interface DemographicsData {
  participantId: string;
  trainingLevel: string;
  trainingLevelOther: string;
  ultrasoundExperienceYears: string;
  needlePlacementsEstimate: string;
}

interface DemographicsProps {
  onDataChange: (data: DemographicsData) => void;
  initialData: DemographicsData;
}

const TRAINING_LEVELS = [
  'MS1',
  'MS2',
  'MS3',
  'MS4',
  'PGY-1',
  'PGY-2',
  'PGY-3',
  'PGY-4',
  'Fellowship-1',
  'Fellowship-2',
  'Attending Surgeon',
  'MD, research/industry role',
  'Other',
] as const;

const ULTRASOUND_EXPERIENCE = [
  'None',
  '<1 year',
  '1–2 years',
  '3–5 years',
  '>5 years',
] as const;

const NEEDLE_PLACEMENTS = ['None', '1–10', '11–50', '51–100', '>100'] as const;

const Demographics: React.FC<DemographicsProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState<DemographicsData>(initialData);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleChange =
    (field: keyof DemographicsData) => (event: { target: { value: string } }) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 3 }}>
        This study investigates whether low-cost needle guidance systems improve performance in
        ultrasound-guided needle placement for nephrostomy procedures, compared to conventional
        freehand techniques.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Participant Demographics &amp; Experience
      </Typography>

      <TextField
        fullWidth
        label="Participant ID"
        value={formData.participantId}
        onChange={handleChange('participantId')}
        sx={{ mb: 3 }}
        required
      />

      <FormControl fullWidth sx={{ mb: 3 }} required>
        <InputLabel id="training-level-label">Training Level</InputLabel>
        <Select
          labelId="training-level-label"
          value={formData.trainingLevel}
          label="Training Level"
          onChange={handleChange('trainingLevel')}
        >
          {TRAINING_LEVELS.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {formData.trainingLevel === 'Other' && (
        <TextField
          fullWidth
          label="Please specify training level"
          value={formData.trainingLevelOther}
          onChange={handleChange('trainingLevelOther')}
          sx={{ mb: 3 }}
          required
        />
      )}

      <FormControl fullWidth sx={{ mb: 3 }} required>
        <InputLabel id="us-experience-label">Years of Experience with Ultrasound</InputLabel>
        <Select
          labelId="us-experience-label"
          value={formData.ultrasoundExperienceYears}
          label="Years of Experience with Ultrasound"
          onChange={handleChange('ultrasoundExperienceYears')}
        >
          {ULTRASOUND_EXPERIENCE.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }} required>
        <InputLabel id="needle-placements-label">
          Estimated Number of Ultrasound-Guided Needle Placements Performed
        </InputLabel>
        <Select
          labelId="needle-placements-label"
          value={formData.needlePlacementsEstimate}
          label="Estimated Number of Ultrasound-Guided Needle Placements Performed"
          onChange={handleChange('needlePlacementsEstimate')}
        >
          {NEEDLE_PLACEMENTS.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Demographics;
