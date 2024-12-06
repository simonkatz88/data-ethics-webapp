'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle2, XCircle, HelpCircle, ExternalLink } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Question {
  id: string;
  text: string;
  category?: string;
  description?: string;
  importance?: string;
  resource?: {
    text: string;
    link: string;
  };
}

interface Section {
  title: string;
  questions: Question[];
}

type ResponseValue = 'yes' | 'no' | 'unsure';
type Responses = Record<string, ResponseValue>;
const WelcomeSection = ({ onStart }: { onStart: () => void }) => (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <Card 
        className="bg-gradient-to-br from-maroon-50 to-maroon-100" 
        style={{ 
          ['--tw-gradient-from' as string]: '#FFF1F1', 
          ['--tw-gradient-to' as string]: '#FFE4E4' 
        }}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold" style={{ color: '#800000' }}>
            A Taxonomy of Normative Concepts for Evaluating Pre-Trial Risk Assessment Algorithms
          </CardTitle>
          <div className="text-sm text-gray-600">
            By Colin McNamara-Bordewick, Simon Katz, Ethan Hochstim
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold" style={{ color: '#800000' }}>Introduction</h3>
            <p className="text-gray-700">
              This evaluation framework addresses a critical question in criminal justice:
            </p>
            <blockquote className="border-l-4 pl-4 my-4" style={{ borderColor: '#800000' }}>
              What normative concepts do scholars use to evaluate the &ldquo;goodness&rdquo; of pre-trial risk assessment algorithms; what considerations shape how these concepts get measured?
            </blockquote>
            <p className="text-gray-700">
              As algorithms increasingly inform judges&apos; decisions about pre-trial release, their implementation brings both promises (improved consistency, reduced bias) and perils (potential discrimination, lack of transparency).
            </p>
            <p className="text-gray-700">
              However, the discourse suffers from a crisis of language. Different scholars apply vastly different criteria when evaluating these algorithms, leading to conceptual confusion both within and across normative dimensions.
            </p>
            
            <h4 className="text-lg font-semibold mt-6" style={{ color: '#800000' }}>Core Evaluation Dimensions</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                {
                  title: "Predictive Performance",
                  description: "The algorithm's ability to predict recidivism risk for out-of-sample observations"
                },
                {
                  title: "Fairness",
                  description: "Ensuring equitable treatment across individuals and groups"
                },
                {
                  title: "Privacy",
                  description: "Protecting sensitive data while maintaining necessary access"
                },
                {
                  title: "Interpretability",
                  description: "Enabling stakeholders to understand and contest decisions"
                },
                {
                  title: "Governance",
                  description: "Operating within constitutional bounds and maintaining accountability"
                }
              ].map((dimension) => (
                <Card key={dimension.title} className="p-4 bg-white/50">
                  <h5 className="font-semibold mb-2" style={{ color: '#800000' }}>{dimension.title}</h5>
                  <p className="text-sm text-gray-600">{dimension.description}</p>
                </Card>
              ))}
            </div>
  
            <div className="mt-8">
              <Button 
                className="w-full"
                style={{
                  backgroundColor: '#800000',
                  color: 'white'
                }}
                onClick={onStart}
              >
                Begin Evaluation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  const sections = [
    {
      title: "Predictive Performance",
      questions: [
        {
          id: "pp1",
          text: "Does the system use discrimination metrics like error rates and confusion matrices to evaluate model performance?",
          category: "discrimination",
          description: "Error rates and confusion matrices are fundamental metrics for understanding model performance.",
          importance: "These metrics help identify where and how the model makes mistakes in its predictions.",
          resource: {
            text: "Evaluating the predictive validity of the COMPAS risk and needs assessment system",
            link: "https://doi.org/10.1177/0093854808326545"
          }
        },
        {
          id: "pp2",
          text: "Are ROC-AUC scores above the satisfactory benchmark of 0.70?",
          category: "discrimination",
          description: "AUCs of .70 or above typically indicate satisfactory predictive accuracy.",
          importance: "This benchmark helps ensure the model meets minimum performance standards.",
          resource: {
            text: "Evaluating the predictive validity of the COMPAS risk and needs assessment system",
            link: "https://doi.org/10.1177/0093854808326545"
          }
        },
        {
          id: "pp3",
          text: "Are calibration plots comparing predicted vs. observed risk regularly generated and monitored?",
          category: "calibration",
          description: "Calibration plots help ensure risk scores accurately reflect actual outcomes.",
          importance: "Good calibration is crucial for ensuring predicted probabilities match observed frequencies.",
          resource: {
            text: "Updating the NYC Criminal Justice Agency Release Assessment",
            link: "https://www.nycja.org/publications/updating-the-new-york-city-criminal-justice-agency-release-assessment"
          }
        },
        {
          id: "pp4",
          text: "Is performance regularly compared against human (judge) decisions?",
          category: "comparative",
          description: "System predictions should be benchmarked against judicial decisions.",
          importance: "Comparing against human decisions helps validate the system's utility.",
          resource: {
            text: "Human decisions and machine predictions",
            link: "https://doi.org/10.1093/qje/qjx032"
          }
        },
        {
          id: "pp5",
          text: "Does the evaluation account for the selective labels problem?",
          category: "comparative",
          description: "Analysis must consider that outcome data is only available for released defendants.",
          importance: "The selective labels problem can create significant biases if not properly addressed.",
          resource: {
            text: "Fragile algorithms and fallible decision-makers",
            link: "https://doi.org/10.1257/jep.35.4.71"
          }
        }
      ]
    },
    {
      title: "Fairness",
      questions: [
        {
          id: "f1",
          text: "Is the Lipschitz condition monitored to ensure score stability?",
          category: "individual",
          description: "Ensures similar defendants receive similar risk scores.",
          importance: "Score stability is crucial for individual fairness.",
          resource: {
            text: "Fairness through awareness",
            link: "https://dl.acm.org/doi/10.1145/2090236.2090255"
          }
        },
        {
          id: "f2",
          text: "Are appropriate distance metrics used to measure defendant similarity?",
          category: "individual",
          description: "Distance metrics should capture meaningful similarities between cases.",
          importance: "Well-defined similarity metrics are fundamental for consistent treatment.",
          resource: {
            text: "Fairness and interpretability in ML",
            link: "https://arxiv.org/abs/2012.15816"
          }
        },
        {
          id: "f3",
          text: "Is predictive parity monitored across protected groups?",
          category: "group",
          description: "Ensures similar prediction accuracy across different groups.",
          importance: "Predictive parity helps identify systematic biases.",
          resource: {
            text: "COMPAS risk scales: Demonstrating accuracy equity and predictive parity",
            link: "https://www.documentcloud.org/documents/2998391-ProPublica-Commentary-Final-070616.html"
          }
        },
        {
          id: "f4",
          text: "Are equalized odds metrics regularly evaluated?",
          category: "group",
          description: "Ensures similar error rates across groups.",
          importance: "Helps ensure no group is systematically disadvantaged.",
          resource: {
            text: "Equality of opportunity in supervised learning",
            link: "https://proceedings.neurips.cc/paper/2016/hash/9d2682367c3935defcb1f9e247a97c0d-Abstract.html"
          }
        },
        {
          id: "f5",
          text: "Is there monitoring for disparate impact?",
          category: "group",
          description: "Systems should be monitored for unintended discriminatory effects.",
          importance: "Legal requirement under various civil rights frameworks.",
          resource: {
            text: "Big data's disparate impact",
            link: "https://doi.org/10.15779/Z38BG31"
          }
        }
      ]
    },
    {
      title: "Privacy",
      questions: [
        {
          id: "p1",
          text: "Does the model only ingest variables empirically shown to predict pretrial outcomes?",
          description: "The system should only use necessary and validated predictive factors.",
          importance: "Adheres to the principle of least privilege in data collection.",
          resource: {
            text: "NIST privacy framework",
            link: "https://www.nist.gov/privacy-framework"
          }
        },
        {
          id: "p2",
          text: "Do court staff only see risk scores and factors directly relevant to pretrial decisions?",
          description: "Staff should only have access to necessary data for their role.",
          importance: "Implements the principle of least privilege in data access.",
          resource: {
            text: "NIST privacy framework",
            link: "https://www.nist.gov/privacy-framework"
          }
        },
        {
          id: "p3",
          text: "Is research conducted using anonymized or aggregated data whenever possible?",
          description: "Research should prioritize using de-identified data.",
          importance: "Protects individual privacy while enabling necessary research.",
          resource: {
            text: "NIST privacy framework",
            link: "https://www.nist.gov/privacy-framework"
          }
        }
      ]
    },
    {
      title: "Interpretability",
      questions: [
        {
          id: "i1",
          text: "Is there public documentation of the model structure and decision-making process?",
          description: "Model structure should be publicly documented.",
          importance: "Transparency enables verification and builds trust.",
          resource: {
            text: "The age of secrecy and unfairness in recidivism prediction",
            link: "https://doi.org/10.1162/99608f92.6ed64b30"
          }
        },
        {
          id: "i2",
          text: "Are there clear procedures for contesting and appealing decisions?",
          description: "Stakeholders should have clear paths to contest decisions.",
          importance: "Essential for due process and accountability.",
          resource: {
            text: "The age of secrecy and unfairness in recidivism prediction",
            link: "https://doi.org/10.1162/99608f92.6ed64b30"
          }
        },
        {
          id: "i3",
          text: "Is there comprehensive training for system users?",
          description: "Users should receive thorough training on system operation.",
          importance: "Ensures proper understanding and use of the system.",
          resource: {
            text: "Disparate interactions: An algorithm-in-the-loop analysis",
            link: "https://doi.org/10.1145/3287560.3287563"
          }
        },
        {
          id: "i4",
          text: "Are model updates and changes properly documented?",
          description: "All system changes should be documented and communicated.",
          importance: "Maintains transparency and enables oversight.",
          resource: {
            text: "The age of secrecy and unfairness in recidivism prediction",
            link: "https://doi.org/10.1162/99608f92.6ed64b30"
          }
        }
      ]
    },
    {
      title: "Governance",
      questions: [
        {
          id: "g1",
          text: "Does the system comply with due process protections?",
          description: "System must meet constitutional requirements.",
          importance: "Constitutional compliance is fundamental for legitimacy.",
          resource: {
            text: "A right to a human decision",
            link: "https://www.virginialawreview.org/wp-content/uploads/2020/05/106VaLRev611.pdf" 
          }
        },
        {
          id: "g2",
          text: "Are there established public oversight mechanisms?",
          description: "Public oversight should be institutionalized.",
          importance: "Ensures democratic accountability.",
          resource: {
            text: "A right to a human decision",
            link: "https://www.virginialawreview.org/wp-content/uploads/2020/05/106VaLRev611.pdf"
          }
        },
        {
          id: "g3",
          text: "Is there a clear process for balancing automation and discretion?",
          description: "System should complement, not replace, judicial discretion.",
          importance: "Maintains appropriate balance of human and algorithmic decision-making.",
          resource: {
            text: "A right to a human decision",
            link: "https://www.virginialawreview.org/wp-content/uploads/2020/05/106VaLRev611.pdf"
          }
        }
      ]
    }
  ];


const RiskAssessmentEval = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const [currentSection, setCurrentSection] = useState<number>(0);
    const [responses, setResponses] = useState<Responses>({});
    const [showResults, setShowResults] = useState<boolean>(false);
  
    const handleStartEvaluation = () => {
      window.scrollTo(0, 0);
      setShowWelcome(false);
    };
  
    if (showWelcome) {
      return (
        <div className="min-h-screen bg-gray-50 py-8">
          <WelcomeSection onStart={handleStartEvaluation} />
        </div>
      );
    }

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

  const getQuestionsNeedingAttention = () => {
    return sections.flatMap(section =>
      section.questions.filter(question =>
        responses[question.id] === 'no' || responses[question.id] === 'unsure'
      )
    );
  };

  const navigateSection = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else if (direction === 'prev' && currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };
  
  const handleResponse = (questionId: string, value: ResponseValue) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  

  return (
    <TooltipProvider>
      <div className="max-w-3xl mx-auto p-4">
        <Card 
          className="bg-gradient-to-br from-maroon-50 to-maroon-100" 
          style={{ 
            ['--tw-gradient-from' as string]: '#FFF1F1', 
            ['--tw-gradient-to' as string]: '#FFE4E4' 
          }}
        >
          <CardHeader className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold" style={{ color: '#800000' }}>Evaluating Pre-Trial Risk Assessment Algorithms</h2>
              <Progress value={calculateProgress()} className="w-32" style={{ 
                backgroundColor: '#FFE4E4',
                ['--tw-gradient-from' as string]: '#FFF1F1', 
                ['--tw-gradient-to' as string]: '#FFE4E4' 
              }}>
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
                      <Tooltip>
                        <TooltipTrigger>
                          <AlertCircle className="w-5 h-5 mt-1" style={{ color: '#800000' }} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{question.description}</p>
                        </TooltipContent>
                      </Tooltip>
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
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 mb-2">
                    <strong>Note on Interpretation:</strong> The goal of this evaluation is not to achieve 100% compliance, 
                    as many of these criteria involve inherent trade-offs and competing objectives.
                  </p>
                  <p className="text-gray-700">
                    Instead, use these results to understand the various dimensions of algorithmic evaluation and 
                    to make informed decisions about which trade-offs align with your system's goals and ethical priorities. 
                    Lower scores in certain areas may be acceptable or even necessary depending on your specific context and requirements.
                  </p>
                </div>

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

                {getQuestionsNeedingAttention().length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4" style={{ color: '#800000' }}>
                      Recommended Improvements
                    </h4>
                    <Accordion type="single" collapsible className="w-full">
                      {getQuestionsNeedingAttention().map((question, index) => (
                        <AccordionItem key={question.id} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center gap-2">
                              {getResponseIcon(responses[question.id])}
                              <span>{question.text}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 p-4">
                              <p className="text-gray-700">{question.importance}</p>
                              <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                                <ExternalLink className="w-4 h-4" />
                                <a 
                                  href={question.resource?.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="underline"
                                >
                                  {question.resource?.text}
                                </a>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                <Button
                  className="w-full mt-6"
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
    </TooltipProvider>
  );
};

export default RiskAssessmentEval;