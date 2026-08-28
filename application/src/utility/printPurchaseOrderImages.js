export const printPurchaseOrderImages = (attachments = []) => {
  const images = attachments.filter(
    (file) => file.file_type !== "application/pdf",
  );

  if (!images.length) {
    alert("There are no images to print.");
    return;
  }

  const printWindow = window.open("", "_blank", "width=900,height=700");

  if (!printWindow) {
    alert("Please allow pop-ups to print the images.");
    return;
  }

  const imageHtml = images
    .map(
      (file) => `
        <div class="print-image">
          <img
            src="/api/file/streams/${file.attachment_id}"
            alt="${file.fileName || "Purchase Order"}"
          />
        </div>
      `,
    )
    .join("");

  printWindow.document.write(`
    <!DOCTYPE html>

    <html>
      <head>
        <title>Purchase Order Images</title>

        <style>
          @page {
            size: Letter;
            margin: 0.5in;
          }

          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;

            background: #ffffff;
          }

          .print-image {
            width: 100%;

            margin: 0 0 1rem;

            page-break-inside: avoid;
            break-inside: avoid;
          }

          .print-image img {
            display: block;

            width: 100%;
            height: auto;

            object-fit: contain;
          }
        </style>
      </head>

      <body>
        ${imageHtml}

        <script>
          const images = document.images;

          let loaded = 0;

          const printWhenReady = () => {
            loaded++;

            if (loaded === images.length) {
              setTimeout(() => {
                window.focus();
                window.print();
              }, 300);
            }
          };

          if (images.length === 0) {
            window.print();
          } else {
            Array.from(images).forEach((img) => {
              if (img.complete) {
                printWhenReady();
              } else {
                img.onload = printWhenReady;
                img.onerror = printWhenReady;
              }
            });
          }
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
};
