import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PDFDownload = ({
  pageTitle = "Chapter",
  targetElementId = null,
}: {
  pageTitle?: string;
  targetElementId?: string | null;
}) => {
  const handleDownload = async () => {
    try {
      // Confirmation dialog
      if (!confirm(`"${pageTitle}" کا PDF ڈاؤن لوڈ کرنا چاہتے ہو؟`)) {
        return;
      }

      // Show loading alert
      alert("PDF تیار ہو رہا ہے... جلد ہی ڈاؤن لوڈ شروع ہوگا!");

      let elementToCapture;

      // If a specific element ID is provided, capture that element; otherwise capture
      // the entire document body
      if (targetElementId) {
        elementToCapture = document.getElementById(targetElementId);
      } else {
        elementToCapture = document.body;
      }

      if (!elementToCapture) {
        throw new Error("Target element not found");
      }

      // Capture the content as an image
      const canvas = await html2canvas(elementToCapture, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      // Add additional pages if content is taller than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save(`${pageTitle.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
    }
  };
  return (
    <button
      onClick={handleDownload}
      style={{
        background: "#6b46c1",
        color: "white",
        border: "none",
        padding: "12px 40px",
        borderRadius: "50px",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        marginTop: "10px",
        maxWidth: "25rem",
        margin: "auto"
       
      }}
    >
      📄 Download PDF
    </button>
   
  );
};

export default PDFDownload;
