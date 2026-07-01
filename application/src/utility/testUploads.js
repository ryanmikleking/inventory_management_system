import fs from "fs";
import axios from "axios";
import FormData from "form-data";

const API = "http://localhost:3001/purchase-orders/extract";

async function upload(filePath) {
  const form = new FormData();
  form.append("purchaseOrderFile", fs.createReadStream(filePath));

  const res = await axios.post(API, form, {
    headers: form.getHeaders(),
  });

  console.log(filePath, res.data.success);
}

for (let i = 1; i <= 100; i++) {
  const file = `./test-pos/PO_${i}.pdf`;
  await upload(file);
}
