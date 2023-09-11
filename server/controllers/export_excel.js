const XlsxModule = require("docxtemplater-xlsx-module");

const fs = require("fs");
export const exportFileExcel = (req, res) => {
  const content = fs.readFileSync(
    "https://tsddbwptfwiyathksqae.supabase.co/storage/v1/object/public/images/Book1.xlsx"
  );
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    modules: [new XlsxModule()],
  });
  doc.render({
    name: "John Doe",
    totalPrice: {
      type: "currency",
      value: 100,
    },
    discount: {
      type: "percent",
      value: 0.195,
    },
  });

  const buffer = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  fs.writeFile("output.xlsx", buffer);
};
