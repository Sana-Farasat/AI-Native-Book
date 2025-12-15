import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Quiz.module.css';

// Define quiz data for each chapter
const chapterQuizzes = {
  'introduction-physical-ai': {
    title: 'Introduction to Physical AI & Embodied Intelligence',
    questions: [
      {
        id: 1,
        question: "What does Physical AI emphasize?",
        options: [
          "Symbolic reasoning only",
          "Embodiment and interaction with the physical world",
          "Simulation environments only",
          "Software algorithms"
        ],
        correctAnswer: 1, // Index of correct option
        explanation: "Physical AI emphasizes the importance of embodiment and interaction with the physical world in shaping intelligence."
      },
      {
        id: 2,
        question: "What is embodied intelligence?",
        options: [
          "AI running on computers only",
          "Intelligence emerging from the tight coupling between perception, action, and environment",
          "AI in virtual reality",
          "Artificial intelligence in mobile phones"
        ],
        correctAnswer: 1,
        explanation: "Embodied intelligence suggests that the physical form and its interactions with the physical world are integral to cognition."
      },
      {
        id: 3,
        question: "What does the Free Energy Principle suggest biological systems try to minimize?",
        options: [
          "Energy consumption",
          "Prediction error (surprise)",
          "Movement",
          "Sensory input"
        ],
        correctAnswer: 1,
        explanation: "According to Karl Friston's Free Energy Principle, biological systems are constantly trying to minimize the surprise or prediction error they experience from their environment."
      },
      {
        id: 4,
        question: "What is sensorimotor integration?",
        options: [
          "Separating sensory and motor systems",
          "The process of integrating sensory input with motor output to perform tasks",
          "Using only sensory systems",
          "Using only motor systems"
        ],
        correctAnswer: 1,
        explanation: "Sensorimotor integration refers to how a humanoid robot skillfully integrates sensory input with motor output to perform complex tasks."
      },
      {
        id: 5,
        question: "What does embodiment suggest about intelligence?",
        options: [
          "Intelligence is independent of the body",
          "The physical form and environmental interaction shape behavior and learning",
          "Only software matters",
          "Intelligence is abstract only"
        ],
        correctAnswer: 1,
        explanation: "Physical AI emphasizes that an intelligent system's physical form and its interactions with the physical world shape its behavior and learning."
      },
      {
        id: 6,
        question: "Which of these is a key component of a humanoid robot system?",
        options: [
          "Perception systems only",
          "Action systems only",
          "Cognitive systems only",
          "Perception, action, and cognitive systems working together"
        ],
        correctAnswer: 3,
        explanation: "Humanoid robot systems integrate perception systems (sensing the environment), action systems (moving and manipulating), and cognitive systems (decision making)."
      },
      {
        id: 7,
        question: "What is the role of the 'Free Energy Principle' in Physical AI?",
        options: [
          "To minimize computational resources",
          "To minimize prediction error or surprise from the environment",
          "To maximize movement",
          "To reduce sensor input"
        ],
        correctAnswer: 1,
        explanation: "The Free Energy Principle explains how biological systems (and by extension, physical AI systems) strive to minimize surprise from their environment."
      },
      {
        id: 8,
        question: "How does embodiment influence intelligence according to Physical AI?",
        options: [
          "It has no influence",
          "It constrains intelligence",
          "Physical form and environmental interaction shape behavior and learning",
          "It only affects motor control"
        ],
        correctAnswer: 2,
        explanation: "Physical AI emphasizes that the physical form and interactions with the environment are integral to cognition and learning."
      },
      {
        id: 9,
        question: "Which of the following is NOT a level of sensorimotor integration?",
        options: [
          "Low-level (reflexes, balance)",
          "Mid-level (object manipulation, navigation)",
          "High-level (complex tasks, social interaction)",
          "Super-level (abstract reasoning only)"
        ],
        correctAnswer: 3,
        explanation: "Sensorimotor integration occurs at low (reflexes), mid (manipulation), and high levels (complex tasks), but not at a 'super-level' of abstract reasoning only."
      },
      {
        id: 10,
        question: "What does the acronym FEP stand for in Physical AI?",
        options: [
          "Fast Embodied Processing",
          "Functional Embodiment Principle",
          "Free Energy Principle",
          "Flexible Embodied Processing"
        ],
        correctAnswer: 2,
        explanation: "FEP stands for Free Energy Principle, a theoretical framework explaining how biological systems minimize surprise from their environment."
      }
    ]
  },
  'ros2-deep-dive': {
    title: 'The Robotic Nervous System – ROS 2 Deep Dive',
    questions: [
      {
        id: 1,
        question: "What does ROS 2 primarily serve as in a robot?",
        options: [
          "The power supply",
          "The nervous system of the robot",
          "The structural frame",
          "The battery system"
        ],
        correctAnswer: 1,
        explanation: "ROS 2 serves as the nervous system of the robot, providing the communication infrastructure for all components."
      },
      {
        id: 2,
        question: "What is a ROS 2 Node?",
        options: [
          "A type of sensor",
          "A physical connection point",
          "A process that performs computation",
          "A type of actuator"
        ],
        correctAnswer: 2,
        explanation: "A Node in ROS 2 is a process that performs computation, typically running a specific task."
      },
      {
        id: 3,
        question: "What communication pattern is used for long-running tasks in ROS 2?",
        options: [
          "Topics",
          "Services",
          "Actions",
          "Broadcasts"
        ],
        correctAnswer: 2,
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
        correctAnswer: 0,
        explanation: "QoS stands for Quality of Service, allowing fine-tuning of communication behavior."
      },
      {
        id: 5,
        question: "What is the primary purpose of ROS 2 launch files?",
        options: [
          "To store robot hardware",
          "To start multiple nodes with predefined configurations",
          "To store robot data",
          "To cool down the system"
        ],
        correctAnswer: 1,
        explanation: "Launch files allow starting multiple nodes with predefined configurations, essential for complex robot systems."
      },
      {
        id: 6,
        question: "Which middleware does ROS 2 use for communication?",
        options: [
          "HTTP",
          "TCP/IP",
          "DDS (Data Distribution Service)",
          "Bluetooth"
        ],
        correctAnswer: 2,
        explanation: "ROS 2 uses the Robotic Middleware (RMW) abstraction layer to interface with different communication frameworks like DDS."
      },
      {
        id: 7,
        question: "What is a key security feature of ROS 2 compared to ROS 1?",
        options: [
          "Password protection",
          "Authentication, authorization, and encryption",
          "Firewall protection",
          "Encrypted storage"
        ],
        correctAnswer: 1,
        explanation: "ROS 2 includes built-in security features: authentication, authorization, and encryption."
      },
      {
        id: 8,
        question: "Which ROS 2 communication pattern is best suited for streaming sensor data?",
        options: [
          "Services",
          "Actions",
          "Topics",
          "Parameters"
        ],
        correctAnswer: 2,
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
        correctAnswer: 0,
        explanation: "The parameter server stores and manages node configurations and settings."
      },
      {
        id: 10,
        question: "What does RMW stand for in ROS 2?",
        options: [
          "Robotic Middleware Wrapper",
          "Robot Model Wrapper",
          "Robotic Middleware",
          "Robotic Model Worker"
        ],
        correctAnswer: 2,
        explanation: "RMW stands for Robotic Middleware, which provides the abstraction layer for different communication frameworks."
      }
    ]
  },
  // Additional chapters would follow similar structure
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
    if (selectedOption === currentQuestion.correctAnswer) {
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
                showResult && index === currentQuestion.correctAnswer && styles.correctOption,
                showResult && selectedOption === index && selectedOption !== currentQuestion.correctAnswer && styles.incorrectOption
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