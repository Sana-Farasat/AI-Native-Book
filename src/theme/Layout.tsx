import React, { useState } from 'react';
import Layout from '@theme-original/Layout';
import PDFDownload from '@site/src/components/PDFDownload';
import FloatingChatButton from '@site/src/components/FloatingChatButton';
import SelectedTextHandler from '@site/src/components/SelectedTextHandler';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function LayoutWrapper(props) {
  const { siteConfig } = useDocusaurusContext();
  const title = props.title || siteConfig.title;
  const [chatQuery, setChatQuery] = useState('');

  // ✅ ONLY customFields (browser-safe)
  // const backendUrl =
  //   siteConfig.customFields?.CHATBOT_API_URL || 'http://localhost:8000' || 'https://ai-native-book-backend-production-0fd7.up.railway.app/';

  const backendUrl =
    siteConfig.customFields?.CHATBOT_API_URL || 'https://ai-native-book-backend-production-0fd7.up.railway.app';

  const handleNewQuery = (query) => {
    setChatQuery(query);
  };

  return (
   <>
     <Layout {...props} />
     <SelectedTextHandler backendUrl={backendUrl} onNewQuery={handleNewQuery} />
     <FloatingChatButton backendUrl={backendUrl} />

     {/* PDF Button — sirf docs pages pe dikhega, Summary ke neeche */}
     {props.children?.props?.location?.pathname?.startsWith('/docs') && (
       <div style={{
         margin: '6rem auto 5rem',
         textAlign: 'center',
         padding: '3rem 2rem',
         background: 'linear-gradient(135deg, #f8f5ff 0%, #ede9ff 100%)',
         borderRadius: '30px',
         border: '5px solid #6b46c1',
         maxWidth: '800px',
         boxShadow: '0 25px 60px rgba(107,70,193,0.3)',
         fontFamily: 'system-ui, sans-serif'
       }}>
         <h2 style={{
           color: '#4c1d95',
           marginBottom: '2rem',
           fontSize: '2.2rem',
           fontWeight: 'bold'
         }}>
           یہ چیپٹر مکمل پڑھ لیا؟
         </h2>
         <PDFDownload pageTitle={title} />
       </div>
     )}
   </>
 );
}