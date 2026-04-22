import React, { useState, useCallback } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import Demographics from './sections/Demographics';
import SystemUsabilityScale from './sections/SystemUsabilityScale';
import NasaTLX from './sections/NasaTLX';
import GeneralFeedback from './sections/GeneralFeedback';
import { submitToGoogleSheets } from '../services/googleSheets';

const steps = ['Demographics', 'SUS — Needle Guidance', 'NASA-TLX', 'Post-Session Evaluation'];

const Survey: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    demographics: {
      participantId: '',
      trainingLevel: '',
      trainingLevelOther: '',
      ultrasoundExperienceYears: '',
      needlePlacementsEstimate: '',
    },
    sus: {},
    nasaTlx: {
      freehand: Array(6).fill(0),
      inPlaneGuide: Array(6).fill(0),
    },
    generalFeedback: {
      preferredTechnique: '',
      preferredTechniqueWhy: '',
      mostAccuratePosteriorCalyx: '',
      mostAccuratePosteriorCalyxWhy: '',
      clinicalChoice: '',
      clinicalChoiceWhy: '',
      easeLearnNeedleGuide: '',
      trainingRequiredBeforeClinical: '',
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleDataChange = useCallback((section: string, data: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  }, []);

  // Memoize section change handlers
  const handleDemographicsChange = useCallback((data: unknown) => {
    handleDataChange('demographics', data);
  }, [handleDataChange]);

  const handleSusChange = useCallback((data: unknown) => {
    handleDataChange('sus', data);
  }, [handleDataChange]);

  const handleNasaTlxChange = useCallback((data: unknown) => {
    handleDataChange('nasaTlx', data);
  }, [handleDataChange]);

  const handleGeneralFeedbackChange = useCallback((data: unknown) => {
    handleDataChange('generalFeedback', data);
  }, [handleDataChange]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await submitToGoogleSheets({
        demographics: formData.demographics,
        sus: formData.sus,
        nasaTlx: formData.nasaTlx,
        generalFeedback: formData.generalFeedback,
        timestamp: new Date().toISOString(),
      });
      setIsSubmitted(true);
      setActiveStep((prevStep) => prevStep + 1);
      alert('Survey submitted successfully!');
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Error submitting survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Demographics 
          onDataChange={handleDemographicsChange} 
          initialData={formData.demographics}
        />;
      case 1:
        return <SystemUsabilityScale 
          onDataChange={handleSusChange} 
          initialData={formData.sus}
        />;
      case 2:
        return <NasaTLX 
          onDataChange={handleNasaTlxChange} 
          initialData={formData.nasaTlx}
        />;
      case 3:
        return <GeneralFeedback 
          onDataChange={handleGeneralFeedbackChange} 
          initialData={formData.generalFeedback}
        />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        {/* Introduction Block */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            US Needle Guidance Study in Senegal
          </Typography>
        </Box>
        {/* Show description only on first page */}
        {activeStep === 0 && (
          <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
            This study is evaluating the usability of a new tool for annotating lung ultrasound images. Please answer the following questions based on your experience.
          </Typography>
        )}
        {/* End Introduction Block */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ mt: 4 }}>
          {isSubmitted ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Thank you for completing the survey!
              </Typography>
            </Box>
          ) : (
            <>
              {renderStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0 || isSubmitting}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {isSubmitting ? 'Submitting...' : activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Survey; 