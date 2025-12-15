import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Quiz.module.css';

// Quiz component for each chapter with 10 questions
const chapterQuizzes = {
  'introduction-physical-ai': {
    title: 'Introduction to Physical AI & Embodied Intelligence',
    questions: [
      {
        id: 1,
        question: "What distinguishes Physical AI from traditional AI approaches?",
        options: [
          "Use of more data",
          "Emphasis on embodiment and physical interaction",
          "More complex algorithms",
          "Faster processing"
        ],
        correct: 1, // Index of correct option
        explanation: "Physical AI emphasizes the importance of embodiment—how an intelligent system's physical form and its interactions with the physical world shape its behavior and learning."
      },
      {
        id: 2,
        question: "What does the Free Energy Principle suggest biological systems try to minimize?",
        options: [
          "Energy consumption",
          "Prediction error or surprise",
          "Physical movement",
          "Sensory input"
        ],
        correct: 1,
        explanation: "According to Karl Friston's Free Energy Principle, biological systems are constantly trying to minimize the surprise or prediction error they experience from their environment."
      },
      {
        id: 3,
        question: "Which of the following is NOT a key principle of Physical AI?",
        options: [
          "Embodiment",
          "Emergence",
          "Purely symbolic reasoning",
          "Sensorimotor contingencies"
        ],
        correct: 2,
        explanation: "Physical AI moves away from purely symbolic reasoning, instead emphasizing how the physical form and environment shape intelligence."
      },
      {
        id: 4,
        question: "What is sensorimotor integration?",
        options: [
          "Combining sensors and motors",
          "The process of integrating sensory input with motor output",
          "Connecting sensors to computer systems",
          "Calibrating sensors and actuators"
        ],
        correct: 1,
        explanation: "Sensorimotor integration refers to how a humanoid robot skillfully integrates sensory input with motor output to perform complex tasks."
      },
      {
        id: 5,
        question: "What does the term 'embodied intelligence' refer to?",
        options: [
          "AI systems with physical bodies",
          "Intelligence that emerges from the tight coupling between perception, action, and environment",
          "AI that can move physically",
          "Robotics applications of AI"
        ],
        correct: 1,
        explanation: "Embodied intelligence suggests that the physical form, sensors, and actuators are integral to cognition, not just an output device."
      },
      {
        id: 6,
        question: "Which component is part of a humanoid robot's perception systems?",
        options: [
          "Actuators",
          "Cameras",
          "Controllers",
          "Processors"
        ],
        correct: 1,
        explanation: "Perception systems include cameras, depth sensors, IMUs, and other sensors that allow the robot to perceive its environment."
      },
      {
        id: 7,
        question: "What is a key characteristic of high-level sensorimotor integration?",
        options: [
          "Simple reflexes",
          "Object recognition and grasping",
          "Long-term planning and adaptation",
          "Balance and posture maintenance"
        ],
        correct: 2,
        explanation: "High-level integration involves complex tasks like planning sequences, social interaction, and long-term learning."
      },
      {
        id: 8,
        question: "What does the acronym 'FEP' stand for in the context of Physical AI?",
        options: [
          "Fast Embodied Processing",
          "Free Energy Principle",
          "Full Embodiment Protocol",
          "Functional Embodied Programming"
        ],
        correct: 1,
        explanation: "The Free Energy Principle (FEP) is a theoretical framework explaining how biological systems minimize surprise from their environment."
      },
      {
        id: 9,
        question: "Which of the following is an example of low-level sensorimotor integration?",
        options: [
          "Planning complex sequences",
          "Social interaction with humans",
          "Reflexive responses to protect the robot",
          "Long-term learning"
        ],
        correct: 2,
        explanation: "Low-level integration includes reflexive responses, balance maintenance, and basic collision avoidance."
      },
      {
        id: 10,
        question: "How does embodiment affect intelligence according to Physical AI principles?",
        options: [
          "It limits intelligence to physical tasks",
          "Physical form and environmental interaction shape behavior and learning",
          "It makes intelligence less efficient",
          "It's not important for intelligence"
        ],
        correct: 1,
        explanation: "Physical AI emphasizes that an intelligent system's physical form and its interactions with the physical world shape its behavior and learning."
      }
    ]
  },
  'ros2-deep-dive': {
    title: 'The Robotic Nervous System – ROS 2 Deep Dive',
    questions: [
      {
        id: 1,
        question: "What does ROS 2 stand for?",
        options: [
          "Robot Operating System 2",
          "Robotic Open Software 2",
          "Robot Operations Suite 2",
          "Robotic Operating System 2"
        ],
        correct: 0,
        explanation: "ROS 2 stands for Robot Operating System 2, serving as the nervous system of modern robots."
      },
      {
        id: 2,
        question: "What is a ROS 2 Node?",
        options: [
          "A sensor on a robot",
          "A physical connection point",
          "A process that performs computation",
          "A type of robot"
        ],
        correct: 2,
        explanation: "Nodes are the fundamental building blocks of ROS 2 applications, with each node being a process that performs computation."
      },
      {
        id: 3,
        question: "Which communication pattern is used for long-running tasks in ROS 2?",
        options: [
          "Topics",
          "Services",
          "Actions",
          "Messages"
        ],
        correct: 2,
        explanation: "Actions are designed for long-running tasks that require goal setting, feedback, and result reporting."
      },
      {
        id: 4,
        question: "What does QoS stand for in ROS 2?",
        options: [
          "Quality of Service",
          "Query over System",
          "Quick Operating System",
          "Quantum Operating System"
        ],
        correct: 0,
        explanation: "QoS stands for Quality of Service, allowing fine-tuning of communication behavior."
      },
      {
        id: 5,
        question: "What is the main advantage of using launch files in ROS 2?",
        options: [
          "Reduced computation",
          "Starting multiple nodes with predefined configurations",
          "Better sensor accuracy",
          "Faster network connections"
        ],
        correct: 1,
        explanation: "Launch files allow starting multiple nodes with predefined configurations, essential for complex robot systems."
      },
      {
        id: 6,
        question: "Which middleware does ROS 2 use for communication?",
        options: [
          "DDS (Data Distribution Service)",
          "HTTP",
          "TCP/IP",
          "USB"
        ],
        correct: 0,
        explanation: "ROS 2 uses the Robotic Middleware (RMW) abstraction layer to interface with different communication frameworks like DDS."
      },
      {
        id: 7,
        question: "What is a key security feature of ROS 2?",
        options: [
          "Password protection",
          "Authentication, authorization, and encryption",
          "Firewall protection",
          "Encrypted storage"
        ],
        correct: 1,
        explanation: "ROS 2 includes built-in security features: authentication, authorization, and encryption."
      },
      {
        id: 8,
        question: "Which ROS 2 communication pattern is best for streaming data?",
        options: [
          "Services",
          "Actions",
          "Topics",
          "Parameters"
        ],
        correct: 2,
        explanation: "Topics are best for streaming data using a publish-subscribe model."
      },
      {
        id: 9,
        question: "What is the purpose of the ROS 2 parameter server?",
        options: [
          "Storing node configurations",
          "Managing network connections",
          "Controlling robot movement",
          "Monitoring battery levels"
        ],
        correct: 0,
        explanation: "The parameter server stores and manages node configurations and settings."
      },
      {
        id: 10,
        question: "What does RMW stand for in ROS 2?",
        options: [
          "Robotic Middleware Wrapper",
          "Robot Message Workbench",
          "Robotic Middleware",
          "Robotic Model Wrapper"
        ],
        correct: 2,
        explanation: "RMW stands for Robotic Middleware, which provides the abstraction layer for different communication frameworks."
      }
    ]
  },
  // More chapters would be added here with similar structures
};

const QuizComponent = ({ chapterId }) => {
  const quiz = chapterQuizzes[chapterId] || chapterQuizzes['introduction-physical-ai'];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex) => {
    if (completed) return; // Prevent selection after quiz completion
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    // Check if answer is correct
    if (selectedOption === currentQuestion.correct) {
      setScore(score + 1);
    }

    // Move to next question or finish quiz
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleShowResult = () => {
    if (selectedOption === null) return;
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className={clsx(styles.quizContainer, styles.resultsContainer)}>
        <h3>Quiz Results: {quiz.title}</h3>
        <div className={styles.score}>
          Your Score: {score} / {quiz.questions.length}
        </div>
        <div className={styles.percentage}>
          Percentage: {Math.round((score / quiz.questions.length) * 100)}%
        </div>
        <div className={styles.feedback}>
          {score === quiz.questions.length ? 'Perfect! Excellent understanding!' : 
           score >= quiz.questions.length * 0.8 ? 'Great job! You have a strong grasp of the material.' :
           score >= quiz.questions.length * 0.6 ? 'Good effort! Review the material to strengthen your understanding.' :
           'Keep studying! Review the chapter content to improve your knowledge.'}
        </div>
        <button className={styles.resetButton} onClick={resetQuiz}>
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <h3>Quiz: {quiz.title}</h3>
      <div className={styles.progress}>
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </div>
      
      <div className={styles.question}>
        <h4>{currentQuestion.question}</h4>
        
        <div className={styles.options}>
          {currentQuestion.options.map((option, index) => (
            <div 
              key={index}
              className={clsx(
                styles.option,
                selectedOption === index && styles.selectedOption,
                showResult && index === currentQuestion.correct && styles.correctOption,
                showResult && selectedOption === index && selectedOption !== currentQuestion.correct && styles.incorrectOption
              )}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </div>
          ))}
        </div>
        
        {showResult && (
          <div className={styles.explanation}>
            <strong>Explanation:</strong> {currentQuestion.explanation}
          </div>
        )}
        
        <div className={styles.controls}>
          {!showResult ? (
            <button 
              className={styles.primaryButton} 
              onClick={handleShowResult}
              disabled={selectedOption === null}
            >
              Check Answer
            </button>
          ) : (
            <button 
              className={styles.primaryButton} 
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;