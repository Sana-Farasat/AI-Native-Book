import React from 'react';
import PDFDownload from '../components/PDFDownload';

// Yeh paths Docusaurus v3 mein 100% kaam karte hain
const QuizComponent = React.lazy(() => 
  import('../components/Chapter/QuizComponent')
);
const SummaryComponent = React.lazy(() => 
  import('../components/Chapter/SummaryComponent')
);

const components = {
  QuizComponent: (props: any) => (
    <React.Suspense fallback={<div style={{padding: '2rem', textAlign: 'center', color: '#666'}}>Loading Quiz...</div>}>
      <QuizComponent {...props} />
    </React.Suspense>
  ),
  SummaryComponent: (props: any) => (
    <React.Suspense fallback={<div style={{padding: '2rem', textAlign: 'center', color: '#666'}}>Loading Summary...</div>}>
      <SummaryComponent {...props} />
    </React.Suspense>
  ),
  PDFDownload: (props: any) => (
        <React.Suspense fallback={<div style={{padding: '2rem', textAlign: 'center', color:
      '#666'}}>Loading PDF Download...</div>}>
          <PDFDownload {...props} />
       </React.Suspense>
     ),
};

export default components;