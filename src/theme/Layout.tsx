import React from 'react';
import Layout from '@theme-original/Layout';
import PDFDownload from '@site/src/components/PDFDownload';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function LayoutWrapper(props) {
  const { siteConfig } = useDocusaurusContext();
  const title = props.title || siteConfig.title;

  return (
   <>
     <Layout {...props} />

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