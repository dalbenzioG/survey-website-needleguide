interface SurveyResponse {
    demographics: {
      participantId: string;
      trainingLevel: string;
      trainingLevelOther: string;
      ultrasoundExperienceYears: string;
      needlePlacementsEstimate: string;
    };
    sus: { [key: string]: string };
    nasaTlx: {
      freehand: number[];
      inPlaneGuide: number[];
    };
    generalFeedback: {
      preferredTechnique: string;
      preferredTechniqueWhy: string;
      mostAccuratePosteriorCalyx: string;
      mostAccuratePosteriorCalyxWhy: string;
      clinicalChoice: string;
      clinicalChoiceWhy: string;
      easeLearnNeedleGuide: string;
      trainingRequiredBeforeClinical: string;
    };
    timestamp: string;
  }
  
  export const submitToGoogleSheets = async (data: SurveyResponse) => {
    try {
      console.log('Submitting survey data:', data);
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbwSE4VKN7OpfTSLyRXMkdRZ9s8jwwKeFcSmZlLmNmNCOjXr5BHtb9K6CTq2oqQXEAsH/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      console.log('Survey submitted successfully');
      return true;
    } catch (error) {
      console.error('Error submitting survey:', error);
      throw new Error('Failed to submit survey. Please try again.');
    }
  };