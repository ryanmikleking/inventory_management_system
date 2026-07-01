import html2pdf from "html2pdf.js";

export const handleDownloadPDF = (pageRef, poId) => {
  const element = pageRef.current;

  const options = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: `purchase-order-${poId}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0,
    },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
    },
    pagebreak: {
      mode: ["css", "legacy"],
    },
  };

  html2pdf().set(options).from(element).save();
};
