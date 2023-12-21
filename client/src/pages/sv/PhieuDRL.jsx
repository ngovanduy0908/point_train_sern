import { Box, Button, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FormPhieuCham from "components/student/FormPhieuCham";
import { generateDocument } from "utils/function/exportFormDRL";
import { AuthContext } from "context/authContext";
import { getInfoForPhieuDiem } from "utils/getDetails/getInfoForPhieuDiem";
import ModalV1 from "components/modal/ModalV1";
import Modal from "components/modal/Modal";
import SeeProof from "components/student/SeeProof";
function calculateTotal(...values) {
  return values.reduce((acc, val) => acc + val, 0);
}
const PhieuDRL = ({ hkItem }) => {
  const { currentUser } = useContext(AuthContext);
  const [info, setInfo] = useState();
  const nameFile = `${currentUser.maSv}_${currentUser.name}_${hkItem.name}`;
  const [openModalProof, setOpenModalProof] = useState(false);
  const fetchData = async () => {
    try {
      const res = await getInfoForPhieuDiem(
        `maSv=${currentUser.maSv}&maHK=${hkItem.maHK}`
      );

      const {
        svNCKH1,
        svNCKH2,
        svNCKH3,
        svOlympic1,
        svOlympic2,
        svOlympic3,
        svOlympic4,
        ltNCKH1,
        ltNCKH2,
        ltNCKH3,
        ltOlympic1,
        ltOlympic2,
        ltOlympic3,
        ltOlympic4,
        gvNCKH1,
        gvNCKH2,
        gvNCKH3,
        gvOlympic1,
        gvOlympic2,
        gvOlympic3,
        gvOlympic4,
      } = res;
      const svNCKH = calculateTotal(
        svNCKH1,
        svNCKH2,
        svNCKH3,
        svOlympic1,
        svOlympic2,
        svOlympic3,
        svOlympic4
      );
      const ltNCKH = calculateTotal(
        ltNCKH1,
        ltNCKH2,
        ltNCKH3,
        ltOlympic1,
        ltOlympic2,
        ltOlympic3,
        ltOlympic4
      );
      const gvNCKH = calculateTotal(
        gvNCKH1,
        gvNCKH2,
        gvNCKH3,
        gvOlympic1,
        gvOlympic2,
        gvOlympic3,
        gvOlympic4
      );
      const sum1sv = calculateTotal(
        res.svDiemTBHK,
        svNCKH1,
        svNCKH2,
        svNCKH3,
        svOlympic1,
        svOlympic2,
        svOlympic3,
        svOlympic4,
        res.svNoRegulation,
        res.svOnTime,
        res.svAbandon,
        res.svUnTrueTime
      );
      const sum1lt = calculateTotal(
        res.ltDiemTBHK,
        ltNCKH1,
        ltNCKH2,
        ltNCKH3,
        ltOlympic1,
        ltOlympic2,
        ltOlympic3,
        ltOlympic4,
        res.ltNoRegulation,
        res.ltOnTime,
        res.ltAbandon,
        res.ltUnTrueTime
      );
      const sum1gv = calculateTotal(
        res.gvDiemTBHK,
        gvNCKH1,
        gvNCKH2,
        gvNCKH3,
        gvOlympic1,
        gvOlympic2,
        gvOlympic3,
        gvOlympic4,
        res.gvNoRegulation,
        res.gvOnTime,
        res.gvAbandon,
        res.gvUnTrueTime
      );
      // console.log("svNCKH: ", sum1lt, sum1gv);
      const sum2sv = calculateTotal(
        res.svRightRule,
        res.svCitizen,
        res.svNoFullStudy,
        res.svNoCard,
        res.svNoAtivities,
        res.svNoPayFee
      );
      const sum2lt = calculateTotal(
        res.ltRightRule,
        res.ltCitizen,
        res.ltNoFullStudy,
        res.ltNoCard,
        res.ltNoAtivities,
        res.ltNoPayFee
      );
      const sum2gv = calculateTotal(
        res.gvRightRule,
        res.gvCitizen,
        res.gvNoFullStudy,
        res.gvNoCard,
        res.gvNoAtivities,
        res.gvNoPayFee
      );
      const svAchievementSchoolCity = calculateTotal(
        res.svAchievementSchool,
        res.svAchievementCity
      );
      const ltAchievementSchoolCity = calculateTotal(
        res.ltAchievementSchool,
        res.ltAchievementCity
      );
      const gvAchievementSchoolCity = calculateTotal(
        res.gvAchievementSchool,
        res.gvAchievementCity
      );
      const sum3sv = calculateTotal(
        res.svFullActive,
        res.svAchievementSchool,
        res.svAchievementCity,
        res.svAdvise,
        res.svIrresponsible,
        res.svNoCultural
      );
      const sum3lt = calculateTotal(
        res.ltFullActive,
        res.ltAchievementSchool,
        res.ltAchievementCity,
        res.ltAdvise,
        res.ltIrresponsible,
        res.ltNoCultural
      );

      const sum3gv = calculateTotal(
        res.gvFullActive,
        res.gvAchievementSchool,
        res.gvAchievementCity,
        res.gvAdvise,
        res.gvIrresponsible,
        res.gvNoCultural
      );

      const sum4sv = calculateTotal(
        res.svPositiveStudy,
        res.svPositiveLove,
        res.svWarn,
        res.svNoProtect
      );

      const sum4lt = calculateTotal(
        res.ltPositiveStudy,
        res.ltPositiveLove,
        res.ltWarn,
        res.ltNoProtect
      );

      const sum4gv = calculateTotal(
        res.gvPositiveStudy,
        res.gvPositiveLove,
        res.gvWarn,
        res.gvNoProtect
      );

      const sum5sv = calculateTotal(
        res.svMonitor,
        res.svBonus,
        res.svIrresponsibleMonitor
      );

      const sum5lt = calculateTotal(
        res.ltMonitor,
        res.ltBonus,
        res.ltIrresponsibleMonitor
      );

      const sum5gv = calculateTotal(
        res.gvMonitor,
        res.gvBonus,
        res.gvIrresponsibleMonitor
      );
      // console.log("sum :", sum2sv);

      setInfo({
        ...res,
        ...currentUser,
        svNCKH: svNCKH,
        ltNCKH: ltNCKH,
        gvNCKH: gvNCKH,
        sum1sv: sum1sv,
        sum1lt: sum1lt,
        sum1gv: sum1gv,
        sum2sv: sum2sv,
        sum2lt: sum2lt,
        sum2gv: sum2gv,
        svAchievementSchoolCity: svAchievementSchoolCity,
        ltAchievementSchoolCity: ltAchievementSchoolCity,
        gvAchievementSchoolCity: gvAchievementSchoolCity,
        sum3sv: sum3sv,
        sum3lt: sum3lt,
        sum3gv: sum3gv,
        sum4sv: sum4sv,
        sum4lt: sum4lt,
        sum4gv: sum4gv,
        sum5sv: sum5sv,
        sum5lt: sum5lt,
        sum5gv: sum5gv,
      });
    } catch (error) {
      console.log("Lỗi: ", error);
    }
    // await generateDocument(nameFile);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleBlankPage = () => {
    window.open(`/print-pdf/${hkItem.maHK}`, "_blank");
  };

  return (
    <Box m="1rem 1.2rem">
      <Box sx={{ flexGrow: 1 }} mb="10px">
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Button
              color="secondary"
              variant="contained"
              sx={{
                width: "100%",
              }}
              onClick={() => generateDocument(nameFile, info)}
            >
              Tải file
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              color="secondary"
              variant="contained"
              sx={{
                width: "100%",
              }}
              onClick={() => handleBlankPage()}
            >
              In file
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              color="secondary"
              variant="contained"
              sx={{
                width: "100%",
              }}
              onClick={() => setOpenModalProof(true)}
            >
              Xem minh chứng
            </Button>
          </Grid>
        </Grid>
      </Box>
      <div className="max-h-[550px] overflow-x-auto">
        <FormPhieuCham maHK={hkItem.maHK} />
      </div>
      <Modal
        open={openModalProof}
        setOpen={setOpenModalProof}
        title={`Minh Chứng - ${hkItem.name}`}
        classNameChildren={"w-[800px]"}
        displayButtonOk={false}
        displayButtonCancel={false}
      >
        <SeeProof maHK={hkItem.maHK} />
      </Modal>
    </Box>
  );
};

export default PhieuDRL;
