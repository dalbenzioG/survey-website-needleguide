import React, { useState, useEffect } from 'react';
import {
  Typography,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface SusData {
  [key: string]: string;
}

interface SystemUsabilityScaleProps {
  onDataChange: (data: SusData) => void;
  initialData: SusData;
}

const SystemUsabilityScale: React.FC<SystemUsabilityScaleProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState<SusData>(initialData);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleChange = (question: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [question]: event.target.value,
    }));
  };

  const questions = [
    {
      id: 'q1',
      text: 'I think that I would like to use needle guidance frequently.',
    },
    {
      id: 'q2',
      text: 'I found needle guidance unnecessarily complex.',
      explanation: 'e.g., too many steps, hard to understand',
    },
    {
      id: 'q3',
      text: 'I thought needle guidance was easy to use.',
    },
    {
      id: 'q4',
      text: 'I think that I would need the support of a technical person to be able to use needle guidance.',
    },
    {
      id: 'q5',
      text: 'I found the various aspects of needle guidance were well integrated.',
    },
    {
      id: 'q6',
      text: 'I thought there was too much inconsistency in needle guidance.',
    },
    {
      id: 'q7',
      text: 'I would imagine that most people would learn to use needle guidance very quickly.',
    },
    {
      id: 'q8',
      text: 'I found needle guidance very cumbersome to use.',
      explanation: 'e.g., awkward, slow, or tedious to operate',
    },
    {
      id: 'q9',
      text: 'I felt very confident using needle guidance.',
    },
    {
      id: 'q10',
      text: 'I needed to learn a lot of things before I could get going with needle guidance.',
    },
  ];

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Section 2: System Usability Scale (SUS) — Needle Guidance
      </Typography>
      <Typography variant="body1" paragraph>
        Please indicate your level of agreement with the following statements about the needle guidance you
        just used.
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '60%' }} />
              <TableCell 
                align="center" 
                sx={{ 
                  width: '7%', 
                  py: 0.4, 
                  px: 0.2, 
                  borderLeft: '1px solid rgba(0, 0, 0, 0.12)', 
                  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#d32f2f'  // Dark red text
                }} 
                padding="none"
              >
                Strongly Disagree
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  width: '7%', 
                  py: 0.4, 
                  px: 0.2, 
                  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#e53935'  // Medium red text
                }} 
                padding="none"
              >
                Disagree
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  width: '7%', 
                  py: 0.4, 
                  px: 0.2, 
                  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#616161'  // Dark grey text
                }} 
                padding="none"
              >
                Neutral
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  width: '7%', 
                  py: 0.4, 
                  px: 0.2, 
                  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#43a047'  // Medium green text
                }} 
                padding="none"
              >
                Agree
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  width: '7%', 
                  py: 0.4, 
                  px: 0.2,
                  color: '#2e7d32'  // Dark green text
                }} 
                padding="none"
              >
                Strongly Agree
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: '60%', py: 2 }}
                >
                  {question.text}
                  {question.explanation && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(0, 0, 0, 0.6)',
                        mt: 0.5,
                        fontStyle: 'italic'
                      }}
                    >
                      {question.explanation}
                    </Typography>
                  )}
                </TableCell>
                {['1', '2', '3', '4', '5'].map((value) => (
                  <TableCell
                    key={value}
                    align="center"
                    padding="none"
                    sx={{ px: 0.2, py: 2 }}
                  >
                    <Radio
                      size="small"
                      name={question.id}
                      value={value}
                      checked={formData[question.id] === value}
                      onChange={handleChange(question.id)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SystemUsabilityScale; 