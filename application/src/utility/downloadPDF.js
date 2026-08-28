import html2pdf from "html2pdf.js";

export const handleDownloadPDF = async (pageRef, poId) => {
  const element = pageRef.current;

  if (!element) {
    console.error("PDF element not found.");
    return;
  }

  // Create temporary PDF-specific styles
  const pdfStyle = document.createElement("style");

  pdfStyle.innerHTML = `
    .pdf-export {
      width: 7.5in !important;
      max-width: 7.5in !important;
      min-width: 7.5in !important;

      box-sizing: border-box !important;

      background: #ffffff !important;

      display: block !important;
    }

    .pdf-export .PdfEdit__header {
      display: block !important;

      width: 100% !important;

      text-align: center !important;

      margin: 0 0 30px 0 !important;

      padding: 0 !important;
    }

    .pdf-export .PdfEdit__img {
      display: block !important;

      width: 180px !important;
      height: auto !important;

      margin: 0 auto 15px auto !important;
    }

    .pdf-export .PdfEdit__page-heading {
      display: block !important;

      width: 100% !important;

      margin: 0 !important;
      padding: 0 !important;

      text-align: center !important;

      line-height: 1.5 !important;
    }

    .pdf-export .PdfEdit__page-heading span {
      display: block !important;

      position: static !important;

      width: 100% !important;

      margin: 0 !important;
      padding: 0 !important;
    }

    .pdf-export .PdfEdit__data-return {
      display: block !important;

      width: 100% !important;
    }

    .pdf-export .PdfEdit__product-containers {
      display: block !important;

      width: 100% !important;
    }

    .pdf-export .PdfEdit__product {
      display: grid !important;

      grid-template-columns: 0.5fr 3fr 1fr 1fr !important;

      width: 100% !important;

      box-sizing: border-box !important;
    }
  `;

  document.head.appendChild(pdfStyle);

  // Tell the element it is being exported
  element.classList.add("pdf-export");

  try {
    // Make sure images are loaded
    const images = element.querySelectorAll("img");

    await Promise.all(
      [...images].map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }),
    );

    // Give the browser one frame to apply the styles
    await new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });

    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],

      filename: `purchase-order-${poId}.pdf`,

      image: {
        type: "jpeg",
        quality: 0.98,
      },

      html2canvas: {
        scale: 2,

        useCORS: true,

        allowTaint: true,

        backgroundColor: "#ffffff",

        scrollX: 0,
        scrollY: 0,

        windowWidth: element.scrollWidth,

        width: element.scrollWidth,
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

    await html2pdf().set(options).from(element).save();
  } catch (error) {
    console.error("PDF generation failed:", error);
  } finally {
    // ALWAYS clean up
    element.classList.remove("pdf-export");

    document.head.removeChild(pdfStyle);
  }
};
