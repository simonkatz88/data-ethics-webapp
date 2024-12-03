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
                  title: "Legal & Political",
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
          text: "Does the system provide comprehensive error rates and confusion matrices for different demographic groups?",
          category: "discrimination",
          description: "Error rates and confusion matrices should be calculated across demographic groups to identify potential biases.",
          importance: "These metrics are fundamental for understanding where the system may be making mistakes and if those mistakes disproportionately affect certain groups.",
          resource: {
            text: "Understanding Error Rate Metrics in Risk Assessment",
            link: "https://example.com/error-rates"
          }
        },
        {
          id: "pp2",
          text: "Are ROC-AUC scores and Precision-Recall curves regularly calculated and monitored?",
          category: "discrimination",
          description: "These curves provide a comprehensive view of model performance across different decision thresholds.",
          importance: "ROC-AUC and PR curves help understand the trade-offs between different types of errors the system might make.",
          resource: {
            text: "Guide to Performance Curve Analysis",
            link: "https://example.com/roc-pr-curves"
          }
        },
        {
          id: "pp3",
          text: "Are calibration plots comparing predicted vs. observed risk regularly generated?",
          category: "calibration",
          description: "Calibration plots help ensure predicted probabilities match actual observed frequencies.",
          importance: "Good calibration is crucial for ensuring risk scores accurately reflect real-world probabilities.",
          resource: {
            text: "Best Practices in Risk Score Calibration",
            link: "https://example.com/calibration"
          }
        },
        {
          id: "pp4",
          text: "Are Expected/Observed ratios monitored across different risk levels?",
          category: "calibration",
          description: "E/O ratios should be tracked to ensure consistency across risk levels.",
          importance: "These ratios help identify if the system is over- or under-predicting risk for different risk categories.",
          resource: {
            text: "Understanding E/O Ratios in Risk Assessment",
            link: "https://example.com/eo-ratios"
          }
        },
        {
          id: "pp5",
          text: "Is group-specific calibration regularly assessed?",
          category: "calibration",
          description: "Calibration should be evaluated separately for different demographic groups.",
          importance: "Group-specific calibration helps ensure the system is equally well-calibrated across all populations.",
          resource: {
            text: "Group Calibration Assessment Guide",
            link: "https://example.com/group-calibration"
          }
        },
        {
          id: "pp6",
          text: "Is performance regularly compared against judges' decisions?",
          category: "comparative",
          description: "System predictions should be benchmarked against human judicial decisions.",
          importance: "Comparing against human decisions helps validate the system's utility and identify areas for improvement.",
          resource: {
            text: "Human-AI Decision Comparison Framework",
            link: "https://example.com/human-comparison"
          }
        },
        {
          id: "pp7",
          text: "Does the evaluation account for the selective labels problem?",
          category: "comparative",
          description: "Analysis should consider that outcome data is only available for released defendants.",
          importance: "The selective labels problem can create significant biases in performance metrics if not properly addressed.",
          resource: {
            text: "Addressing Selective Labels in Risk Assessment",
            link: "https://example.com/selective-labels"
          }
        }
      ]
    },
    {
      title: "Fairness",
      questions: [
        {
          id: "f1",
          text: "Are technical measures implemented to ensure similar defendants receive similar risk scores?",
          category: "individual",
          description: "Individual fairness measures should be in place based on relevant factors.",
          importance: "Individual fairness ensures consistency in risk assessment for similar cases, preventing arbitrary differences.",
          resource: {
            text: "Implementing Individual Fairness Measures",
            link: "https://example.com/individual-fairness"
          }
        },
        {
          id: "f2",
          text: "Is the Lipschitz condition monitored for score stability?",
          category: "individual",
          description: "The Lipschitz condition ensures small changes in inputs don't lead to large changes in scores.",
          importance: "Score stability is crucial for ensuring the system's reliability and fairness.",
          resource: {
            text: "Understanding Score Stability Metrics",
            link: "https://example.com/score-stability"
          }
        },
        {
          id: "f3",
          text: "Are appropriate distance metrics used to measure defendant similarity?",
          category: "individual",
          description: "Distance metrics should capture meaningful similarities between cases.",
          importance: "Well-defined similarity metrics are fundamental for ensuring consistent treatment of similar cases.",
          resource: {
            text: "Case Similarity Metrics Guide",
            link: "https://example.com/similarity-metrics"
          }
        },
        {
          id: "f4",
          text: "Are predictive parity metrics monitored across protected groups?",
          category: "group",
          description: "Predictive parity ensures similar prediction accuracy across different groups.",
          importance: "Group-level fairness metrics help identify and address systematic biases.",
          resource: {
            text: "Guide to Predictive Parity",
            link: "https://example.com/predictive-parity"
          }
        },
        {
          id: "f5",
          text: "Are equalized odds metrics regularly evaluated?",
          category: "group",
          description: "Equalized odds ensure similar error rates across groups.",
          importance: "This metric helps ensure the system isn't systematically advantaging or disadvantaging any group.",
          resource: {
            text: "Understanding Equalized Odds",
            link: "https://example.com/equalized-odds"
          }
        },
        {
          id: "f6",
          text: "Is there regular monitoring for disparate impact?",
          category: "group",
          description: "Systems should be monitored for unintended discriminatory effects.",
          importance: "Identifying and addressing disparate impact is crucial for legal compliance and ethical operation.",
          resource: {
            text: "Disparate Impact Analysis Guide",
            link: "https://example.com/disparate-impact"
          }
        }
      ]
    },
    {
      title: "Privacy",
      questions: [
        {
          id: "p1",
          text: "Does the system implement the principle of least privilege for data access?",
          description: "Access to data should be limited to what's necessary for each role.",
          importance: "Least privilege helps prevent unauthorized access and protect sensitive information.",
          resource: {
            text: "Implementing Least Privilege Access",
            link: "https://example.com/least-privilege"
          }
        },
        {
          id: "p2",
          text: "Are there controls limiting staff access to only necessary data?",
          description: "Staff should only have access to data required for their specific duties.",
          importance: "Role-based access controls are essential for maintaining data privacy and security.",
          resource: {
            text: "Role-Based Access Control Guide",
            link: "https://example.com/rbac"
          }
        },
        {
          id: "p3",
          text: "Is research conducted using anonymized or aggregated data whenever possible?",
          description: "Research and analysis should prioritize using de-identified data.",
          importance: "Using anonymized data helps protect individual privacy while enabling necessary research.",
          resource: {
            text: "Data Anonymization Best Practices",
            link: "https://example.com/anonymization"
          }
        },
        {
          id: "p4",
          text: "Does the model only ingest variables empirically shown to predict pretrial outcomes?",
          description: "The system should only use necessary and validated predictive factors.",
          importance: "Limiting data use to necessary predictors helps protect privacy and prevent spurious correlations.",
          resource: {
            text: "Variable Selection in Risk Assessment",
            link: "https://example.com/variable-selection"
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
          description: "Model structure and decision processes should be publicly documented.",
          importance: "Transparency in model structure is crucial for public trust and system verification.",
          resource: {
            text: "Model Documentation Guidelines",
            link: "https://example.com/model-documentation"
          }
        },
        {
          id: "i2",
          text: "Are there clear procedures for contesting and appealing decisions?",
          description: "Stakeholders should have clear paths to contest system decisions.",
          importance: "Appeal procedures are essential for ensuring accountability and addressing errors.",
          resource: {
            text: "Implementing Appeal Procedures",
            link: "https://example.com/appeal-procedures"
          }
        },
        {
          id: "i3",
          text: "Is there comprehensive training for system users?",
          description: "Users should receive thorough training on system operation and limitations.",
          importance: "User training ensures proper system use and understanding of its capabilities and limitations.",
          resource: {
            text: "Risk Assessment System Training Guide",
            link: "https://example.com/system-training"
          }
        },
        {
          id: "i4",
          text: "Are model updates and changes properly documented?",
          description: "All system changes should be thoroughly documented and communicated.",
          importance: "Change documentation ensures transparency and enables proper system oversight.",
          resource: {
            text: "Model Change Management Best Practices",
            link: "https://example.com/change-management"
          }
        }
      ]
    },
    {
      title: "Legal & Political",
      questions: [
        {
          id: "l1",
          text: "Does the system comply with all relevant constitutional and statutory requirements?",
          description: "System must meet due process and equal protection requirements.",
          importance: "Constitutional compliance is fundamental for system legitimacy and legal operation.",
          resource: {
            text: "Legal Requirements in Risk Assessment",
            link: "https://example.com/legal-requirements"
          }
        },
        {
          id: "l2",
          text: "Are there established public oversight mechanisms?",
          description: "Public oversight should be institutionalized and effective.",
          importance: "Public oversight ensures accountability and maintains democratic control.",
          resource: {
            text: "Implementing Public Oversight",
            link: "https://example.com/public-oversight"
          }
        },
        {
          id: "l3",
          text: "Is there a clear process for regular system evaluation and updates?",
          description: "Regular evaluation and update procedures should be established.",
          importance: "Regular evaluation ensures the system remains current and effective.",
          resource: {
            text: "System Evaluation Framework",
            link: "https://example.com/evaluation-framework"
          }
        },
        {
          id: "l4",
          text: "Are roles and responsibilities clearly defined within the justice system?",
          description: "System integration with existing processes should be clearly defined.",
          importance: "Clear role definition ensures proper system integration and use.",
          resource: {
            text: "Role Definition Guidelines",
            link: "https://example.com/role-definition"
          }
        }
      ]
    }
  ];

// Add importance and resource for all sections...

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
              <h2 className="text-2xl font-bold" style={{ color: '#800000' }}>Risk Assessment System Evaluation</h2>
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