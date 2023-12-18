import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./print.css";
import FormPhieuChamPrint from "components/student/FormPhieuChamPrint";
const BlankFilePdf = () => {
  const { maHK } = useParams();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.print();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div id="print">
      <FormPhieuChamPrint maHK={maHK} />
    </div>
  );
};

export default BlankFilePdf;
