'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

// Add interfaces for our data structures
interface Question {
  id: string;
  text: string;
  category?: string;
}

interface Section {
  title: string;
  questions: Question[];
}

// Type the responses state
type ResponseValue = 'yes' | 'no' | 'unsure';
type Responses = Record<string, ResponseValue>;

const sections = [
  {
    title: "Predictive Performance",
    questions: [
      {
        id: "pp1",
        text: "Does the system provide comprehensive error rates and confusion matrices for different demographic groups?",
        category: "discrimination"
      },
      {
        id: "pp2",
        text: "Are ROC-AUC scores and Precision-Recall curves regularly calculated and monitored?",
        category: "discrimination"
      },
      {
        id: "pp3",
        text: "Are calibration plots comparing predicted vs. observed risk regularly generated?",
        category: "calibration"
      },
      {
        id: "pp4",
        text: "Is performance regularly compared against human judge decisions?",
        category: "comparative"
      }
    ]
  },
  {
    title: "Fairness",
    questions: [
      {
        id: "f1",
        text: "Does the system implement technical measures to ensure similar defendants receive similar risk scores?",
        category: "individual"
      },
      {
        id: "f2",
        text: "Are demographic parity metrics regularly monitored across protected groups?",
        category: "group"
      },
      {
        id: "f3",
        text: "Is there a process to identify and address potential disparate impact?",
        category: "group"
      }
    ]
  },
  {
    title: "Privacy",
    questions: [
      {
        id: "p1",
        text: "Does the system implement the principle of least privilege for data access?",
      },
      {
        id: "p2",
        text: "Are there controls limiting staff access to only necessary data?",
      },
      {
        id: "p3",
        text: "Is research conducted using anonymized or aggregated data whenever possible?",
      }
    ]
  },
  {
    title: "Transparency & Interpretability",
    questions: [
      {
        id: "t1",
        text: "Is there public documentation of the model structure and decision-making process?",
      },
      {
        id: "t2",
        text: "Are there clear procedures for contesting and appealing decisions?",
      },
      {
        id: "t3",
        text: "Is there comprehensive training for system users?",
      }
    ]
  },
  {
    title: "Legal & Political",
    questions: [
      {
        id: "l1",
        text: "Does the system comply with all relevant constitutional and statutory requirements?",
      },
      {
        id: "l2",
        text: "Are there established public oversight mechanisms?",
      },
      {
        id: "l3",
        text: "Is there a clear process for regular system evaluation and updates?",
      }
    ]
  }
];

const RiskAssessmentEval = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [responses, setResponses] = useState<Responses>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleResponse = (questionId: string, value: ResponseValue) => {
    setResponses({
      ...responses,
      [questionId]: value
    });
  };

  const calculateProgress = () => {
    const totalQuestions = sections.reduce((acc, section) => acc + section.questions.length, 0);
    const answeredQuestions = Object.keys(responses).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const getResponseIcon = (value: ResponseValue) => {
    switch(value) {
      case 'yes':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'no':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'unsure':
        return <HelpCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const calculateSectionCompliance = (section: Section) => {
    const sectionQuestions = section.questions;
    const yesCount = sectionQuestions.filter(q => responses[q.id] === 'yes').length;
    return (yesCount / sectionQuestions.length) * 100;
  };

  const navigateSection = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else if (direction === 'prev' && currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="bg-gradient-to-br from-maroon-50 to-maroon-100" style={{ '--tw-gradient-from': '#FFF1F1', '--tw-gradient-to': '#FFE4E4' }}>
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold" style={{ color: '#800000' }}>Risk Assessment System Evaluation</h2>
            <Progress value={calculateProgress()} className="w-32" style={{ backgroundColor: '#FFE4E4' }}>
              <div 
                className="h-full transition-all" 
                style={{ 
                  width: `${calculateProgress()}%`,
                  backgroundColor: '#800000'
                }}
              />
            </Progress>
          </div>
          <p className="text-sm text-gray-600">Section {currentSection + 1} of {sections.length}: {sections[currentSection].title}</p>
          <Separator className="bg-maroon-200" style={{ backgroundColor: '#FFD5D5' }}/>
        </CardHeader>

        <CardContent className="space-y-8">
          {!showResults ? (
            <>
              {sections[currentSection].questions.map((question) => (
                <div key={question.id} className="space-y-4">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 mt-1" style={{ color: '#800000' }} />
                    <p className="text-gray-800">{question.text}</p>
                  </div>
                  <div className="flex gap-4">
                    {['yes', 'no', 'unsure'].map((value) => (
                      <Button
                        key={value}
                        variant={responses[question.id] === value ? "default" : "outline"}
                        className="flex-1 py-2 flex items-center justify-center gap-2 transition-colors"
                        style={{
                          backgroundColor: responses[question.id] === value ? '#800000' : 'transparent',
                          borderColor: '#800000',
                          color: responses[question.id] === value ? 'white' : '#800000',
                        }}
                        onClick={() => handleResponse(question.id, value as ResponseValue)}
                      >
                        {getResponseIcon(value as ResponseValue)}
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <Separator style={{ backgroundColor: '#FFD5D5' }}/>
                </div>
              ))}

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => navigateSection('prev')}
                  disabled={currentSection === 0}
                  style={{
                    borderColor: '#800000',
                    color: '#800000'
                  }}
                >
                  Previous
                </Button>
                {currentSection === sections.length - 1 ? (
                  <Button 
                    onClick={() => setShowResults(true)}
                    style={{
                      backgroundColor: '#800000',
                      color: 'white'
                    }}
                  >
                    View Results
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigateSection('next')}
                    style={{
                      backgroundColor: '#800000',
                      color: 'white'
                    }}
                  >
                    Next
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold" style={{ color: '#800000' }}>Evaluation Results</h3>
              {sections.map((section, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{section.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{calculateSectionCompliance(section).toFixed(1)}% Compliance</span>
                    </div>
                  </div>
                  <Progress value={calculateSectionCompliance(section)}>
                    <div 
                      className="h-full transition-all" 
                      style={{ 
                        width: `${calculateSectionCompliance(section)}%`,
                        backgroundColor: '#800000'
                      }}
                    />
                  </Progress>
                </div>
              ))}
              <Button
                className="w-full"
                style={{
                  backgroundColor: '#800000',
                  color: 'white'
                }}
                onClick={() => {
                  setShowResults(false);
                  setCurrentSection(0);
                }}
              >
                Start Over
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentEval;