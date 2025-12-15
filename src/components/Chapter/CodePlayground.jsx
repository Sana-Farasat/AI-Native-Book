import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './CodePlayground.module.css';

const CodePlayground = ({ initialCode, language = 'python', title = 'Interactive Code Playground' }) => {
  const [code, setCode] = useState(initialCode || 
    `# Welcome to the ROS 2 code playground!\n# Try writing your ROS 2 code here\nprint("Hello from ROS 2!")`
  );
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRunCode = () => {
    // In a real implementation, this would send the code to a backend service for execution
    // For this example, we'll just simulate output
    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      let simulatedOutput = '';
      
      // Simple simulation based on code content
      if (code.includes('rclpy')) {
        simulatedOutput = `ROS 2 node initialized\nNode name: minimal_publisher\nPublisher: /topic\nTimer period: 0.5s`;
      } else if (code.includes('import')) {
        simulatedOutput = `Imported modules successfully\nReady to execute code...`;
      } else {
        simulatedOutput = `Executing code...\nOperation completed successfully`;
      }
      
      setOutput(simulatedOutput);
      setIsLoading(false);
    }, 1000);
  };

  const handleResetCode = () => {
    setCode(initialCode || 
      `# Welcome to the ROS 2 code playground!\n# Try writing your ROS 2 code here\nprint("Hello from ROS 2!")`
    );
    setOutput('');
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className={styles.playgroundContainer}>
      <div className={styles.playgroundHeader}>
        <h4>{title}</h4>
        <div className={styles.languageTag}>Language: {language}</div>
      </div>
      
      <div className={styles.editorContainer}>
        <textarea
          value={code}
          onChange={handleCodeChange}
          className={styles.codeEditor}
          spellCheck="false"
        />
      </div>
      
      <div className={styles.controls}>
        <button 
          className={clsx(styles.controlButton, styles.runButton)} 
          onClick={handleRunCode}
          disabled={isLoading}
        >
          {isLoading ? 'Running...' : '▶ Run Code'}
        </button>
        
        <button 
          className={clsx(styles.controlButton, styles.resetButton)} 
          onClick={handleResetCode}
        >
          ⊞ Reset
        </button>
      </div>
      
      {output && (
        <div className={styles.outputContainer}>
          <div className={styles.outputHeader}>
            <h5>Output:</h5>
          </div>
          <pre className={styles.outputContent}>
            {output}
          </pre>
        </div>
      )}
      
      <div className={styles.codeGuidance}>
        <p><strong>Note:</strong> This is a simulation. In a real environment, this would execute actual ROS 2 code.</p>
        <p>You can experiment with ROS 2 concepts like nodes, publishers, subscribers, and services.</p>
      </div>
    </div>
  );
};

export default CodePlayground;