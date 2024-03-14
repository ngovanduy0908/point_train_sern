import { Box, Button } from "@mui/material";
import axios from "axios";
import Header from "components/Header";
// import { getUserInLocalStorage } from "context/getCurrentUser";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/css/grid.css";
import "../../components/student/phieu.css";
import Input from "components/input/Input";
import { getPointMonitorByMaSVAndMaHK } from "utils/getDetails/getPointMonitorByMa";
import { insertOrUpdatePointStudentMonitor } from "utils/postDetails/insertOrUpdatePointMonitor";
import { io } from "socket.io-client";
const IO = process.env.REACT_APP_IO;
const DOMAIN = process.env.REACT_APP_DOMAIN;
const colSpan = 3;
const DuyetDiemRenLuyenLT = ({
  sinhVienItem,
  fetchData,
  setOpen,
  currentUser,
  socket,
}) => {
  const maSv = sinhVienItem.maSv;
  // const navigate = useNavigate();
  const { maHK } = useParams();

  const [studentData, setStudentData] = useState([]);
  const [data, setData] = useState([]);
  const [pointCitizenMediumData, setCitizenMediumPointData] = useState({});
  const [pointStudentData, setPointStudentData] = useState({});

  // console.log("pointStudentData: ", pointStudentData);
  const [values, setValues] = useState({
    // muc 1
    svDiemTBHK: pointCitizenMediumData.svDiemTBHK
      ? pointCitizenMediumData.svDiemTBHK
      : 0,
    svNCKH1: pointCitizenMediumData.svNCKH1
      ? pointCitizenMediumData.svNCKH1
      : 0,
    svNCKH2: pointCitizenMediumData.svNCKH2
      ? pointCitizenMediumData.svNCKH2
      : 0,
    svNCKH3: pointCitizenMediumData.svNCKH3
      ? pointCitizenMediumData.svNCKH3
      : 0,
    svOlympic1: pointCitizenMediumData.svOlympic1
      ? pointCitizenMediumData.svOlympic1
      : 0,
    svOlympic2: pointCitizenMediumData.svOlympic2
      ? pointCitizenMediumData.svOlympic2
      : 0,
    svOlympic3: pointCitizenMediumData.svOlympic3
      ? pointCitizenMediumData.svOlympic3
      : 0,
    svOlympic4: pointCitizenMediumData.svOlympic4
      ? pointCitizenMediumData.svOlympic4
      : 0,
    svNoRegulation: pointCitizenMediumData.svNoRegulation
      ? pointCitizenMediumData.svNoRegulation
      : 0,
    svOnTime: pointCitizenMediumData.svOnTime
      ? pointCitizenMediumData.svOnTime
      : 0,
    svAbandon: pointCitizenMediumData.svAbandon
      ? pointCitizenMediumData.svAbandon
      : 0,
    svUnTrueTime: pointCitizenMediumData.svUnTrueTime
      ? pointCitizenMediumData.svUnTrueTime
      : 0,

    // muc 2
    svRightRule: 0,
    svCitizen: 0,
    svNoFullStudy: 0,
    svNoCard: 0,
    svNoAtivities: 0,
    svNoPayFee: 0,

    // muc 3
    svFullActive: 0,
    svAchievementCity: 0,
    svAchievementSchool: 0,
    svAdvise: 0,
    svIrresponsible: 0,
    svNoCultural: 0,

    // muc 4
    svPositiveStudy: 0,
    svPositiveLove: 0,
    svWarn: 0,
    svNoProtect: 0,

    // muc 5
    svMonitor: 0,
    svBonus: 0,
    svIrresponsibleMonitor: 0,
  });

  const [valuesLT, setValuesLT] = useState({
    // muc 1
    ltDiemTBHK: pointCitizenMediumData.ltDiemTBHK
      ? pointCitizenMediumData.ltDiemTBHK
      : 0,
    ltNCKH1: pointCitizenMediumData.ltNCKH1
      ? pointCitizenMediumData.ltNCKH1
      : 0,
    ltNCKH2: pointCitizenMediumData.ltNCKH2
      ? pointCitizenMediumData.ltNCKH2
      : 0,
    ltNCKH3: pointCitizenMediumData.ltNCKH3
      ? pointCitizenMediumData.ltNCKH3
      : 0,
    ltOlympic1: pointCitizenMediumData.ltOlympic1
      ? pointCitizenMediumData.ltOlympic1
      : 0,
    ltOlympic2: pointCitizenMediumData.ltOlympic2
      ? pointCitizenMediumData.ltOlympic2
      : 0,
    ltOlympic3: pointCitizenMediumData.ltOlympic3
      ? pointCitizenMediumData.ltOlympic3
      : 0,
    ltOlympic4: pointCitizenMediumData.ltOlympic4
      ? pointCitizenMediumData.ltOlympic4
      : 0,
    ltNoRegulation: pointCitizenMediumData.ltNoRegulation
      ? pointCitizenMediumData.ltNoRegulation
      : 0,
    ltOnTime: pointCitizenMediumData.ltOnTime
      ? pointCitizenMediumData.ltOnTime
      : 0,
    ltAbandon: pointCitizenMediumData.ltAbandon
      ? pointCitizenMediumData.ltAbandon
      : 0,
    ltUnTrueTime: pointCitizenMediumData.ltUnTrueTime
      ? pointCitizenMediumData.ltUnTrueTime
      : 0,

    // muc 2
    ltRightRule: 0,
    ltCitizen: 0,
    ltNoFullStudy: 0,
    ltNoCard: 0,
    ltNoAtivities: 0,
    ltNoPayFee: 0,

    // muc 3
    ltFullActive: 0,
    ltAchievementCity: 0,
    ltAchievementSchool: 0,
    ltAdvise: 0,
    ltIrresponsible: 0,
    ltNoCultural: 0,

    // muc 4
    ltPositiveStudy: 0,
    ltPositiveLove: 0,
    ltWarn: 0,
    ltNoProtect: 0,

    // muc 5
    ltMonitor: 0,
    ltBonus: 0,
    ltIrresponsibleMonitor: 0,
  });

  const [checkboxState, setCheckboxState] = useState({
    svNoRegulation: false,
    svOnTime: false,
    svRightRule: false,
    svNoFullStudy: false,
    svNoPayFee: false,
    svFullActive: false,
    svPositiveStudy: false,
    svPositiveLove: false,
    svWarn: false,
    svNoProtect: false,
    svMonitor: false,
    svBonus: false,
  });

  const [checkboxStateLT, setCheckboxStateLT] = useState({
    ltNoRegulation: false,
    ltOnTime: false,
    ltRightRule: false,
    ltNoFullStudy: false,
    ltNoPayFee: false,
    ltFullActive: false,
    ltPositiveStudy: false,
    ltPositiveLove: false,
    ltWarn: false,
    ltNoProtect: false,
    ltMonitor: false,
    ltBonus: false,
  });

  const checkExisPoint = async () => {
    try {
      const getStudentPoint = await axios.get(
        `${DOMAIN}/points/get_point_student/${maHK}/${sinhVienItem.maSv}`,
        {
          withCredentials: true,
        }
      );
      // console.log("getStudentPoint.data: ", getStudentPoint.data);
      if (getStudentPoint.data) {
        setPointStudentData(getStudentPoint.data);
        // return
        // navigate(`/chamdiemrenluyen/${maHK}/after_mark`);
        setValues((prev) => ({
          ...prev,
          // muc 1
          svDiemTBHK: getStudentPoint.data.svDiemTBHK,
          svNCKH1: getStudentPoint.data.svNCKH1,
          svNCKH2: getStudentPoint.data.svNCKH2,
          svNCKH3: getStudentPoint.data.svNCKH3,
          svOlympic1: getStudentPoint.data.svOlympic1,
          svOlympic2: getStudentPoint.data.svOlympic2,
          svOlympic3: getStudentPoint.data.svOlympic3,
          svOlympic4: getStudentPoint.data.svOlympic4,
          svNoRegulation: getStudentPoint.data.svNoRegulation,
          svOnTime: getStudentPoint.data.svOnTime,
          svAbandon: getStudentPoint.data.svAbandon,
          svUnTrueTime: getStudentPoint.data.svUnTrueTime,

          // muc 2
          svRightRule: getStudentPoint.data.svRightRule,
          svCitizen: getStudentPoint.data.svCitizen,
          svNoFullStudy: getStudentPoint.data.svNoFullStudy,
          svNoCard: getStudentPoint.data.svNoCard,
          svNoAtivities: getStudentPoint.data.svNoAtivities,
          svNoPayFee: getStudentPoint.data.svNoPayFee,

          // muc 3
          svFullActive: getStudentPoint.data.svFullActive,
          svAchievementCity: getStudentPoint.data.svAchievementCity,
          svAchievementSchool: getStudentPoint.data.svAchievementSchool,
          svAdvise: getStudentPoint.data.svAdvise,
          svIrresponsible: getStudentPoint.data.svIrresponsible,
          svNoCultural: getStudentPoint.data.svNoCultural,

          // muc 4
          svPositiveStudy: getStudentPoint.data.svPositiveStudy,
          svPositiveLove: getStudentPoint.data.svPositiveLove,
          svWarn: getStudentPoint.data.svWarn,
          svNoProtect: getStudentPoint.data.svNoProtect,

          // muc 5
          svMonitor: getStudentPoint.data.svMonitor,
          svBonus: getStudentPoint.data.svBonus,
          svIrresponsibleMonitor: getStudentPoint.data.svIrresponsibleMonitor,
        }));
        setValuesLT((prev) => ({
          ...prev,
          // muc 1
          ltDiemTBHK: getStudentPoint.data.svDiemTBHK,
          ltNCKH1: getStudentPoint.data.svNCKH1,
          ltNCKH2: getStudentPoint.data.svNCKH2,
          ltNCKH3: getStudentPoint.data.svNCKH3,
          ltOlympic1: getStudentPoint.data.svOlympic1,
          ltOlympic2: getStudentPoint.data.svOlympic2,
          ltOlympic3: getStudentPoint.data.svOlympic3,
          ltOlympic4: getStudentPoint.data.svOlympic4,
          ltNoRegulation: getStudentPoint.data.svNoRegulation,
          ltOnTime: getStudentPoint.data.svOnTime,
          ltAbandon: getStudentPoint.data.svAbandon,
          ltUnTrueTime: getStudentPoint.data.svUnTrueTime,

          // muc 2
          ltRightRule: getStudentPoint.data.svRightRule,
          ltCitizen: getStudentPoint.data.svCitizen,
          ltNoFullStudy: getStudentPoint.data.svNoFullStudy,
          ltNoCard: getStudentPoint.data.svNoCard,
          ltNoAtivities: getStudentPoint.data.svNoAtivities,
          ltNoPayFee: getStudentPoint.data.svNoPayFee,

          // muc 3
          ltFullActive: getStudentPoint.data.svFullActive,
          ltAchievementCity: getStudentPoint.data.svAchievementCity,
          ltAchievementSchool: getStudentPoint.data.svAchievementSchool,
          ltAdvise: getStudentPoint.data.svAdvise,
          ltIrresponsible: getStudentPoint.data.svIrresponsible,
          ltNoCultural: getStudentPoint.data.svNoCultural,

          // muc 4
          ltPositiveStudy: getStudentPoint.data.svPositiveStudy,
          ltPositiveLove: getStudentPoint.data.svPositiveLove,
          ltWarn: getStudentPoint.data.svWarn,
          ltNoProtect: getStudentPoint.data.svNoProtect,

          // muc 5
          ltMonitor: getStudentPoint.data.svMonitor,
          ltBonus: getStudentPoint.data.svBonus,
          ltIrresponsibleMonitor: getStudentPoint.data.svIrresponsibleMonitor,
        }));
        setCheckboxState((prev) => ({
          ...prev,
          svNoRegulation:
            getStudentPoint.data.svNoRegulation === 3 ? true : false,
          svOnTime: getStudentPoint.data.svOnTime === 2 ? true : false,
          svRightRule: getStudentPoint.data.svRightRule === 10 ? true : false,
          svNoFullStudy:
            getStudentPoint.data.svNoFullStudy === -10 ? true : false,
          svNoPayFee: getStudentPoint.data.svNoPayFee === -10 ? true : false,
          svFullActive: getStudentPoint.data.svFullActive === 13 ? true : false,
          svPositiveStudy:
            getStudentPoint.data.svPositiveStudy === 10 ? true : false,
          svPositiveLove:
            getStudentPoint.data.svPositiveLove === 5 ? true : false,
          svWarn: getStudentPoint.data.svWarn === -5 ? true : false,
          svNoProtect: getStudentPoint.data.svNoProtect === -20 ? true : false,
          // svMonitor: getStudentPoint.data.svMonitor === 7 ? true : false,
          svBonus: getStudentPoint.data.svBonus === 3 ? true : false,
        }));
        setCheckboxStateLT((prev) => ({
          ...prev,
          ltNoRegulation:
            getStudentPoint.data.svNoRegulation === 3 ? true : false,
          ltOnTime: getStudentPoint.data.svOnTime === 2 ? true : false,
          ltRightRule: getStudentPoint.data.svRightRule === 10 ? true : false,
          ltNoFullStudy:
            getStudentPoint.data.svNoFullStudy === -10 ? true : false,
          ltNoPayFee: getStudentPoint.data.svNoPayFee === -10 ? true : false,
          ltFullActive: getStudentPoint.data.svFullActive === 13 ? true : false,
          ltPositiveStudy:
            getStudentPoint.data.svPositiveStudy === 10 ? true : false,
          ltPositiveLove:
            getStudentPoint.data.svPositiveLove === 5 ? true : false,
          ltWarn: getStudentPoint.data.svWarn === -5 ? true : false,
          ltNoProtect: getStudentPoint.data.svNoProtect === -20 ? true : false,
          // svMonitor: getStudentPoint.data.svMonitor === 7 ? true : false,
          ltBonus: getStudentPoint.data.svBonus === 3 ? true : false,
        }));
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    checkExisPoint();
    getSv();
    getPointCitizenMediumSv();
  }, []);

  const getPointMonitor = async () => {
    const res = await getPointMonitorByMaSVAndMaHK(`maHK=${maHK}&maSv=${maSv}`);
    if (res) {
      // console.log("vao trong nay: ", res);
      setValuesLT((prev) => ({
        ...prev,
        // muc 1
        ltDiemTBHK: res.ltDiemTBHK,
        ltNCKH1: res.ltNCKH1,
        ltNCKH2: res.ltNCKH2,
        ltNCKH3: res.ltNCKH3,
        ltOlympic1: res.ltOlympic1,
        ltOlympic2: res.ltOlympic2,
        ltOlympic3: res.ltOlympic3,
        ltOlympic4: res.ltOlympic4,
        ltNoRegulation: res.ltNoRegulation,
        ltOnTime: res.ltOnTime,
        ltAbandon: res.ltAbandon,
        ltUnTrueTime: res.ltUnTrueTime,

        // muc 2
        ltRightRule: res.ltRightRule,
        ltCitizen: res.ltCitizen,
        ltNoFullStudy: res.ltNoFullStudy,
        ltNoCard: res.ltNoCard,
        ltNoAtivities: res.ltNoAtivities,
        ltNoPayFee: res.ltNoPayFee,

        // muc 3
        ltFullActive: res.ltFullActive,
        ltAchievementCity: res.ltAchievementCity,
        ltAchievementSchool: res.ltAchievementSchool,
        ltAdvise: res.ltAdvise,
        ltIrresponsible: res.ltIrresponsible,
        ltNoCultural: res.ltNoCultural,

        // muc 4
        ltPositiveStudy: res.ltPositiveStudy,
        ltPositiveLove: res.ltPositiveLove,
        ltWarn: res.ltWarn,
        ltNoProtect: res.ltNoProtect,

        // muc 5
        ltMonitor: res.ltMonitor,
        ltBonus: res.ltBonus,
        ltIrresponsibleMonitor: res.ltIrresponsibleMonitor,
      }));

      setCheckboxStateLT((prev) => ({
        ...prev,
        ltNoRegulation: res.ltNoRegulation === 3 ? true : false,
        ltOnTime: res.ltOnTime === 2 ? true : false,
        ltRightRule: res.ltRightRule === 10 ? true : false,
        ltNoFullStudy: res.ltNoFullStudy === -10 ? true : false,
        ltNoPayFee: res.ltNoPayFee === -10 ? true : false,
        ltFullActive: res.ltFullActive === 13 ? true : false,
        ltPositiveStudy: res.ltPositiveStudy === 10 ? true : false,
        ltPositiveLove: res.ltPositiveLove === 5 ? true : false,
        ltWarn: res.ltWarn === -5 ? true : false,
        ltNoProtect: res.ltNoProtect === -20 ? true : false,
        // ltMonitor: res.ltMonitor === 7 ? true : false,
        ltBonus: res.ltBonus === 3 ? true : false,
      }));
    } else {
      setValuesLT((prev) => ({
        ...prev,
        // muc 1
        // ltDiemTBHK: res.ltDiemTBHK,
        ltNCKH1: 0,
        ltNCKH2: 0,
        ltNCKH3: 0,
        ltOlympic1: 0,
        ltOlympic2: 0,
        ltOlympic3: 0,
        ltOlympic4: 0,
        ltNoRegulation: 0,
        ltOnTime: 0,
        ltAbandon: 0,
        ltUnTrueTime: 0,

        // muc 2
        ltRightRule: 0,
        // ltCitizen: res.ltCitizen,
        ltNoFullStudy: 0,
        ltNoCard: 0,
        ltNoAtivities: 0,
        ltNoPayFee: 0,

        // muc 3
        ltFullActive: 0,
        ltAchievementCity: 0,
        ltAchievementSchool: 0,
        ltAdvise: 0,
        ltIrresponsible: 0,
        ltNoCultural: 0,

        // muc 4
        ltPositiveStudy: 0,
        ltPositiveLove: 0,
        ltWarn: 0,
        ltNoProtect: 0,

        // muc 5
        // ltMonitor: res.ltMonitor,
        ltBonus: 0,
        ltIrresponsibleMonitor: 0,
      }));

      setCheckboxStateLT((prev) => ({
        ...prev,
        ltNoRegulation: false,
        ltOnTime: false,
        ltRightRule: false,
        ltNoFullStudy: false,
        ltNoPayFee: false,
        ltFullActive: false,
        ltPositiveStudy: false,
        ltPositiveLove: false,
        ltWarn: false,
        ltNoProtect: false,
        // ltMonitor:  false,
        ltBonus: false,
      }));
    }
  };
  useEffect(() => {
    getPointMonitor();
  }, []);

  const getSv = async () => {
    try {
      const getOneSv = await axios.get(
        `http://localhost:8800/api/students/get_one_sv/${maHK}/${sinhVienItem.maSv}`,
        {
          withCredentials: true,
        }
      );
      setStudentData(getOneSv.data.table1);
      setData(getOneSv.data.table2);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getPointCitizenMediumSv = async () => {
    try {
      const getCitizenMediumPoint = await axios.get(
        `http://localhost:8800/api/points/get_citizen_medium/${maHK}/${sinhVienItem.maSv}`,
        {
          withCredentials: true,
        }
      );
      //   console.log("getCitizenMediumPoint: ", getCitizenMediumPoint.data);
      setCitizenMediumPointData(getCitizenMediumPoint.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const changeValueTBHK =
      pointCitizenMediumData.point_average >= 3.6
        ? 20
        : pointCitizenMediumData.point_average >= 3.2
        ? 18
        : pointCitizenMediumData.point_average >= 2.5
        ? 16
        : pointCitizenMediumData.point_average >= 2.0
        ? 12
        : pointCitizenMediumData.point_average >= 1.5
        ? 10
        : pointCitizenMediumData.point_average >= 1.0
        ? 8
        : 0;
    const changeValueCitizen =
      pointCitizenMediumData.point >= 90
        ? 15
        : pointCitizenMediumData.point >= 65
        ? 10
        : pointCitizenMediumData.point >= 50
        ? 5
        : 0;
    const changeSvMonitor = [3, 5, 6].includes(studentData[0]?.role_id)
      ? 7
      : [7, 8, 9].includes(studentData[0]?.role_id)
      ? 5
      : 0;

    setValuesLT((prev) => ({
      ...prev,
      // ltDiemTBHK: changeValueTBHK,
      // ltCitizen: changeValueCitizen,
      // ltMonitor: changeSvMonitor,
    }));
  }, [pointCitizenMediumData, studentData]);

  // start sum diem sinh vien
  const sum1 =
    parseInt(values.svDiemTBHK) +
    parseInt(values.svNCKH1) +
    parseInt(values.svNCKH2) +
    parseInt(values.svNCKH3) +
    parseInt(values.svOlympic1) +
    parseInt(values.svOlympic2) +
    parseInt(values.svOlympic3) +
    parseInt(values.svOlympic4) +
    parseInt(values.svNoRegulation) +
    parseInt(values.svOnTime) +
    parseInt(values.svAbandon) +
    parseInt(values.svUnTrueTime);

  const sum2 =
    parseInt(values.svRightRule) +
    parseInt(values.svCitizen) +
    parseInt(values.svNoFullStudy) +
    parseInt(values.svNoCard) +
    parseInt(values.svNoAtivities) +
    parseInt(values.svNoPayFee);

  const sum3 =
    parseInt(values.svFullActive) +
    parseInt(values.svAchievementCity) +
    parseInt(values.svAchievementSchool) +
    parseInt(values.svAdvise) +
    parseInt(values.svIrresponsible) +
    parseInt(values.svNoCultural);

  const sum4 =
    parseInt(values.svPositiveStudy) +
    parseInt(values.svPositiveLove) +
    parseInt(values.svWarn) +
    parseInt(values.svNoProtect);

  const sum5 =
    parseInt(values.svMonitor) +
    parseInt(values.svBonus) +
    parseInt(values.svIrresponsibleMonitor);

  const [sum, setSum] = useState(sum1 + sum2 + sum3 + sum4 + sum5);

  const [sumOne, setSumOne] = useState(sum1);
  const [sumTwo, setSumTwo] = useState(sum2);
  const [sumThree, setSumThree] = useState(sum3);
  const [sumFour, setSumFour] = useState(sum4);
  const [sumFive, setSumFive] = useState(sum5);
  // end sum tong sinh vien

  // start sum diem lop truong
  const sum1lt =
    parseInt(valuesLT.ltDiemTBHK) +
    parseInt(valuesLT.ltNCKH1) +
    parseInt(valuesLT.ltNCKH2) +
    parseInt(valuesLT.ltNCKH3) +
    parseInt(valuesLT.ltOlympic1) +
    parseInt(valuesLT.ltOlympic2) +
    parseInt(valuesLT.ltOlympic3) +
    parseInt(valuesLT.ltOlympic4) +
    parseInt(valuesLT.ltNoRegulation) +
    parseInt(valuesLT.ltOnTime) +
    parseInt(valuesLT.ltAbandon) +
    parseInt(valuesLT.ltUnTrueTime);

  const sum2lt =
    parseInt(valuesLT.ltRightRule) +
    parseInt(valuesLT.ltCitizen) +
    parseInt(valuesLT.ltNoFullStudy) +
    parseInt(valuesLT.ltNoCard) +
    parseInt(valuesLT.ltNoAtivities) +
    parseInt(valuesLT.ltNoPayFee);

  const sum3lt =
    parseInt(valuesLT.ltFullActive) +
    parseInt(valuesLT.ltAchievementCity) +
    parseInt(valuesLT.ltAchievementSchool) +
    parseInt(valuesLT.ltAdvise) +
    parseInt(valuesLT.ltIrresponsible) +
    parseInt(valuesLT.ltNoCultural);

  const sum4lt =
    parseInt(valuesLT.ltPositiveStudy) +
    parseInt(valuesLT.ltPositiveLove) +
    parseInt(valuesLT.ltWarn) +
    parseInt(valuesLT.ltNoProtect);

  const sum5lt =
    parseInt(valuesLT.ltMonitor) +
    parseInt(valuesLT.ltBonus) +
    parseInt(valuesLT.ltIrresponsibleMonitor);

  const [sumlt, setSumlt] = useState(
    sum1lt + sum2lt + sum3lt + sum4lt + sum5lt
  );

  const [sumOnelt, setSumOnelt] = useState(sum1lt);
  const [sumTwolt, setSumTwolt] = useState(sum2lt);
  const [sumThreelt, setSumThreelt] = useState(sum3lt);
  const [sumFourlt, setSumFourlt] = useState(sum4lt);
  const [sumFivelt, setSumFivelt] = useState(sum5lt);
  // end sum tong lop truong
  const handleChangeValue = (e) => {
    const { name, value, checked } = e.target;

    setValuesLT((prev) => ({
      ...prev,
      [name]: checked ? value : 0,
    }));
    setCheckboxStateLT((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleChangeSelect = (e) => {
    const { name, value } = e.target;
    setValuesLT((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log("name: ", name);
    setValuesLT((prevValues) => ({
      ...prevValues,
      [name]: value ? value : 0,
    }));
  };
  // start sum sinh vien
  useEffect(() => {
    const sum1 =
      parseInt(values.svDiemTBHK) +
      parseInt(values.svNCKH1) +
      parseInt(values.svNCKH2) +
      parseInt(values.svNCKH3) +
      parseInt(values.svOlympic1) +
      parseInt(values.svOlympic2) +
      parseInt(values.svOlympic3) +
      parseInt(values.svOlympic4) +
      parseInt(values.svNoRegulation) +
      parseInt(values.svOnTime) +
      parseInt(values.svAbandon) +
      parseInt(values.svUnTrueTime);
    setSumOne(sum1);

    const sum2 =
      parseInt(values.svRightRule) +
      parseInt(values.svCitizen) +
      parseInt(values.svNoFullStudy) +
      parseInt(values.svNoCard) +
      parseInt(values.svNoAtivities) +
      parseInt(values.svNoPayFee);

    setSumTwo(sum2);

    const sum3 =
      parseInt(values.svFullActive) +
      parseInt(values.svAchievementCity) +
      parseInt(values.svAchievementSchool) +
      parseInt(values.svAdvise) +
      parseInt(values.svIrresponsible) +
      parseInt(values.svNoCultural);
    setSumThree(sum3);

    const sum4 =
      parseInt(values.svPositiveStudy) +
      parseInt(values.svPositiveLove) +
      parseInt(values.svWarn) +
      parseInt(values.svNoProtect);
    setSumFour(sum4);

    const sum5 =
      parseInt(values.svMonitor) +
      parseInt(values.svBonus) +
      parseInt(values.svIrresponsibleMonitor);
    setSumFive(sum5);

    const sum = sum1 + sum2 + sum3 + sum4 + sum5;
    setSum(sum);
    // console.log("thay doi");
  }, [values]);
  // end sum sinh vien

  // start sum lop truong
  useEffect(() => {
    const sum1 =
      parseInt(values.svDiemTBHK) +
      parseInt(valuesLT.ltNCKH1) +
      parseInt(valuesLT.ltNCKH2) +
      parseInt(valuesLT.ltNCKH3) +
      parseInt(valuesLT.ltOlympic1) +
      parseInt(valuesLT.ltOlympic2) +
      parseInt(valuesLT.ltOlympic3) +
      parseInt(valuesLT.ltOlympic4) +
      parseInt(valuesLT.ltNoRegulation) +
      parseInt(valuesLT.ltOnTime) +
      parseInt(valuesLT.ltAbandon) +
      parseInt(valuesLT.ltUnTrueTime);
    setSumOnelt(sum1);

    const sum2 =
      parseInt(valuesLT.ltRightRule) +
      parseInt(values.svCitizen) +
      parseInt(valuesLT.ltNoFullStudy) +
      parseInt(valuesLT.ltNoCard) +
      parseInt(valuesLT.ltNoAtivities) +
      parseInt(valuesLT.ltNoPayFee);

    setSumTwolt(sum2);

    const sum3 =
      parseInt(valuesLT.ltFullActive) +
      parseInt(valuesLT.ltAchievementCity) +
      parseInt(valuesLT.ltAchievementSchool) +
      parseInt(valuesLT.ltAdvise) +
      parseInt(valuesLT.ltIrresponsible) +
      parseInt(valuesLT.ltNoCultural);
    setSumThreelt(sum3);

    const sum4 =
      parseInt(valuesLT.ltPositiveStudy) +
      parseInt(valuesLT.ltPositiveLove) +
      parseInt(valuesLT.ltWarn) +
      parseInt(valuesLT.ltNoProtect);
    setSumFourlt(sum4);

    const sum5 =
      parseInt(values.svMonitor) +
      parseInt(valuesLT.ltBonus) +
      parseInt(valuesLT.ltIrresponsibleMonitor);
    setSumFivelt(sum5);

    const sum = sum1 + sum2 + sum3 + sum4 + sum5;
    setSumlt(sum);
    // console.log("thay doi");
  }, [valuesLT]);
  // end sum lop truong

  // socket
  // const [socket, setSocket] = useState();

  // useEffect(() => {
  //   setSocket(io(`${IO}`));
  //   // console.log("socket: ", socket);
  // }, []);

  // useEffect(() => {
  //   socket?.emit("newUser", sinhVienItem);
  // }, [socket, sinhVienItem]);

  // end socket

  const handleSubmit = async () => {
    try {
      const data = {
        ...valuesLT,
        sum: sumlt,
      };
      await insertOrUpdatePointStudentMonitor(
        `maHK=${maHK}&maSv=${maSv}`,
        data
      );
      fetchData();
      setOpen(false);
      toast.success("Duyệt Điểm Rèn Luyện Thành Công", {
        autoClose: 2000,
      });
      socket.emit("sendNotification", {
        senderName: currentUser.maSv,
        receiverName: sinhVienItem.maSv,
      });
    } catch (error) {
      toast.success("Cham Diem Ren Luyen That Bai", {
        autoClose: 2000,
      });
      console.log(error.message);
    }
  };

  const handleClickDuyet = async (e) => {
    if (e.target.checked) {
      setValuesLT((prev) => ({
        ...prev,
        // muc 1
        ltDiemTBHK: values.svDiemTBHK,
        ltNCKH1: values.svNCKH1,
        ltNCKH2: values.svNCKH2,
        ltNCKH3: values.svNCKH3,
        ltOlympic1: values.svOlympic1,
        ltOlympic2: values.svOlympic2,
        ltOlympic3: values.svOlympic3,
        ltOlympic4: values.svOlympic4,
        ltNoRegulation: values.svNoRegulation,
        ltOnTime: values.svOnTime,
        ltAbandon: values.svAbandon,
        ltUnTrueTime: values.svUnTrueTime,

        // muc 2
        ltRightRule: values.svRightRule,
        ltCitizen: values.svCitizen,
        ltNoFullStudy: values.svNoFullStudy,
        ltNoCard: values.svNoCard,
        ltNoAtivities: values.svNoAtivities,
        ltNoPayFee: values.svNoPayFee,

        // muc 3
        ltFullActive: values.svFullActive,
        ltAchievementCity: values.svAchievementCity,
        ltAchievementSchool: values.svAchievementSchool,
        ltAdvise: values.svAdvise,
        ltIrresponsible: values.svIrresponsible,
        ltNoCultural: values.svNoCultural,

        // muc 4
        ltPositiveStudy: values.svPositiveStudy,
        ltPositiveLove: values.svPositiveLove,
        ltWarn: values.svWarn,
        ltNoProtect: values.svNoProtect,

        // muc 5
        ltMonitor: values.svMonitor,
        ltBonus: values.svBonus,
        ltIrresponsibleMonitor: values.svIrresponsibleMonitor,
      }));

      setCheckboxStateLT((prev) => ({
        ...prev,
        ltNoRegulation: values.svNoRegulation === 3 ? true : false,
        ltOnTime: values.svOnTime === 2 ? true : false,
        ltRightRule: values.svRightRule === 10 ? true : false,
        ltNoFullStudy: values.svNoFullStudy === -10 ? true : false,
        ltNoPayFee: values.svNoPayFee === -10 ? true : false,
        ltFullActive: values.svFullActive === 13 ? true : false,
        ltPositiveStudy: values.svPositiveStudy === 10 ? true : false,
        ltPositiveLove: values.svPositiveLove === 5 ? true : false,
        ltWarn: values.svWarn === -5 ? true : false,
        ltNoProtect: values.svNoProtect === -20 ? true : false,
        // svMonitor: values.svMonitor === 7 ? true : false,
        ltBonus: values.svBonus === 3 ? true : false,
      }));
    } else {
      getPointMonitor();
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        subtitle={`Điểm tuần công dân sinh viên: ${
          pointCitizenMediumData?.point
            ? pointCitizenMediumData?.point
            : "Chưa có"
        } - Điểm trung bình học kì: ${
          pointCitizenMediumData?.point_average
            ? pointCitizenMediumData?.point_average
            : "Chưa có"
        }`}
      />

      <Box
        sx={{
          padding: "25px",
          border: "1px solid #ccc",
        }}
      >
        {/* header */}
        <div className="container__header">
          <div className="container__header-title">
            <span className="container__header-title-one">
              <p className="">BỘ GIÁO DỤC VÀ ĐÀO TẠO</p>
              <p className="container__header-title-school">
                TRƯỜNG ĐẠI HỌC MỎ - ĐỊA CHẤT
              </p>
            </span>
            <span className="container__header-title-two">
              <p className="container__header-title-school">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </p>
              <p style={{ fontWeight: "bold" }}>
                <u>Độc lập - Tự do - Hạnh phúc</u>
              </p>
            </span>
          </div>
          <div className="container__header-heading">
            <h5>PHIẾU ĐÁNH GIÁ KẾT QUẢ RÈN LUYỆN CHO SINH VIÊN</h5>
            <p>
              (Ban hành kèm theo Quyết định số: 148 /QĐ-MĐC ngày 05 tháng 3 năm
              2021)
            </p>
          </div>
          <div className="container__header-info">
            <div className="row">
              <div className="l-6">Họ tên: {studentData[0]?.name}</div>
              <div className="l-6">Mã số SV: {studentData[0]?.maSv} </div>
            </div>
            <div className="row">
              <div className="l-3">Lớp: {studentData[0]?.class_name}</div>
              <div className="l-2">Khoá: {studentData[0]?.course_name}</div>
              <div className="l-1"></div>
              <div className="l-6">Khoa: {studentData[0]?.department_name}</div>
            </div>
            <div className="row">
              <div className="l-6">Học kỳ: {data[0]?.semester}</div>
              <div className="l-6">Năm học: {data[0]?.year}</div>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="container__content">
          <form onSubmit={(e) => e.preventDefault()}>
            <table className="table table-bordered">
              {/* header table */}
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "center",
                      width: "80%",
                      padding: "0px",
                      lineHeight: "83.5px",
                    }}
                  >
                    Nội dung đánh giá
                  </th>
                  <th>Điểm do sinh viên tự đánh giá</th>
                  <th>Điểm do lớp đánh giá</th>

                  {/* <th className="textCenter" style={{ width: '10%' }}>
                    Điểm do lớp đánh giá
                  </th>
                  <th class="textCenter" style={{ width: '10%' }}>
                    Điểm do hội đồng Khoa đánh giá
                  </th> */}
                </tr>
              </thead>

              {/* body table */}
              <tbody>
                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        I. <u>Đánh giá về ý thức và kết quả học tập</u>
                      </span>{" "}
                      <span style={{ fontStyle: "italic" }}>
                        (Tính điểm thi lần 1. Tổng điểm: 0 - 30 điểm)
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                        1. Phần cộng điểm
                      </span>{" "}
                      (tổng điểm có thể chấm quá 30 khi SV đạt giải NCKH, thi
                      Olimpic cấp Bộ hoặc cấp Quốc gia)
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>a). Kết quả học tập:</td>
                </tr>

                <tr>
                  <td>
                    - Điểm TBCHT ≥ 3,6:
                    ..............................................................……….......(+20đ)
                    <br /> - Điểm TBCHT từ 3,2 đến 3,59:
                    ............................................................(+18)
                    <br /> - Điểm TBCHT từ 2,5 đến 3,19:
                    ...........................................................(+16đ)
                    <br /> - Điểm TBCHT từ 2,0 đến 2,49:
                    ..........................................................(+12đ)
                    <br /> - Điểm TBCHT từ 1,5 đến 1,99:
                    ..........................................................(+10đ)
                    <br /> - Điểm TBCHT từ 1,0 đến 1,49:
                    ............................................................(+8đ)
                  </td>
                  <td>
                    <input
                      type="number"
                      name="svDiemTBHK"
                      id=""
                      value={values.svDiemTBHK}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="ltDiemTBHK"
                      id=""
                      value={values.svDiemTBHK}
                      readOnly
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    b). Nghiên cứu khoa học, thi Olympic, Robocon và các cuộc
                    thi khác:
                    <span>
                      (cộng điểm thưởng theo QĐ số 1171/QĐ-MĐC ngày 12/11/2020
                      về quản lý KHCN của trường Đại học Mỏ-Địa chất)*
                    </span>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Đạt giải NCKH cấp Bộ và giải tương đương tối
                    đa………………..….(+8đ)
                  </td>
                  <td>
                    <input
                      type="number"
                      name="svNCKH1"
                      id=""
                      min="0"
                      max="8"
                      value={values.svNCKH1}
                      onChange={handleChangeInput}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="ltNCKH1"
                      id=""
                      min="0"
                      max="8"
                      value={valuesLT.ltNCKH1}
                      onChange={handleChangeInput}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Đạt giải NCKH cấp Trường, Tiểu ban chuyên môn tối đa:
                    ………..... (+6đ)
                  </td>
                  <td>
                    <input
                      type="number"
                      name="svNCKH2"
                      id=""
                      min="0"
                      max="6"
                      value={values.svNCKH2}
                      onChange={handleChangeInput}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="ltNCKH2"
                      id=""
                      min="0"
                      max="6"
                      value={valuesLT.ltNCKH2}
                      handleChangeInput={handleChangeInput}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Đạt giải NCKH khác tối đa: ……....……………..……………...…….(+6đ)
                  </td>
                  <td>
                    <input
                      type="number"
                      name="svNCKH3"
                      id=""
                      min="0"
                      max="6"
                      value={values.svNCKH3}
                      onChange={handleChangeInput}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="ltNCKH3"
                      id=""
                      min="0"
                      max="6"
                      value={valuesLT.ltNCKH3}
                      handleChangeInput={handleChangeInput}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Đạt giải Olympic cấp Quốc gia tối đa:
                    ………...…………………….(+10đ)
                  </td>
                  <td>
                    <input
                      type="number"
                      name="svOlympic1"
                      id=""
                      min="0"
                      max="10"
                      value={values.svOlympic1}
                      onChange={handleChangeInput}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="ltOlympic1"
                      id=""
                      min="0"
                      max="10"
                      value={valuesLT.ltOlympic1}
                      handleChangeInput={handleChangeInput}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Tham gia Olympic cấp Quốc gia tối đa: ………...……
                    ..……….…....(+6đ)
                  </td>
                  <td>
                    <input
                      type="number"
                      name="svOlympic2"
                      id=""
                      min="0"
                      max="6"
                      value={values.svOlympic2}
                      onChange={handleChangeInput}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="ltOlympic2"
                      id=""
                      min="0"
                      max="6"
                      value={valuesLT.ltOlympic2}
                      handleChangeInput={handleChangeInput}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Đạt giải Olympic cấp Trường tối đa:
                    …........................................................(+5đ)
                  </td>
                  <td>
                    <input
                      type="number"
                      name="svOlympic3"
                      id=""
                      min="0"
                      max="5"
                      value={values.svOlympic3}
                      onChange={handleChangeInput}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="ltOlympic3"
                      id=""
                      min="0"
                      max="5"
                      value={valuesLT.ltOlympic3}
                      onChange={handleChangeInput}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Tham gia Olympic cấp Trường tối đa: ………...……….
                    …….............(+2đ)
                  </td>
                  <td>
                    <input
                      type="number"
                      name="svOlympic4"
                      id=""
                      min="0"
                      max="2"
                      value={values.svOlympic4}
                      onChange={handleChangeInput}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="ltOlympic4"
                      id=""
                      min="0"
                      max="2"
                      value={valuesLT.ltOlympic4}
                      handleChangeInput={handleChangeInput}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    c) Việc thực hiện nội quy học tập, quy chế thi, kiểm tra
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Không vi phạm quy chế thi, kiểm
                    tra:………………….………….......(+3đ)
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="svNoRegulation"
                      id=""
                      value="3"
                      onChange={handleChangeValue}
                      checked={values.svNoRegulation === 3}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="ltNoRegulation"
                      id=""
                      value="3"
                      onChange={handleChangeValue}
                      checked={checkboxStateLT.ltNoRegulation}
                    />
                  </td>
                </tr>
                {pointStudentData && (
                  <tr>
                    <td width="70%">
                      - Đi học đầy đủ, đúng giờ:
                      ………………….......................…………....(+2đ)
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="svOnTime"
                        id=""
                        value="2"
                        onChange={handleChangeValue}
                        checked={checkboxState.svOnTime}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="ltOnTime"
                        id=""
                        value="2"
                        onChange={handleChangeValue}
                        checked={checkboxStateLT.ltOnTime}
                      />
                    </td>
                  </tr>
                )}

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        2. Phần trừ điểm
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    a). Đã đăng ký, nhưng bỏ không tham tham gia nghiên cứu khoa
                    học, thi Olympic, Robocon và các cuộc thi khác tương đương:
                    ........................ (-15đ)
                  </td>
                  <td>
                    <input
                      type="number"
                      name="svAbandon"
                      id=""
                      min="-15"
                      max="0"
                      value={values.svAbandon}
                      onChange={handleChangeInput}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="ltAbandon"
                      id=""
                      min="-15"
                      max="0"
                      value={valuesLT.ltAbandon}
                      handleChangeInput={handleChangeInput}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    b). Không đi học, đi không đúng giờ:
                    .………………...………......(-2đ/buổi)
                  </td>
                  <td>
                    <select
                      name="svUnTrueTime"
                      id="svUnTrueTime"
                      onChange={handleChangeSelect}
                      value={values.svUnTrueTime}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index * -2}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      name="ltUnTrueTime"
                      id="ltUnTrueTime"
                      onChange={handleChangeSelect}
                      value={valuesLT.ltUnTrueTime}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index * -2}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    <h5>Cộng mục I</h5>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="sumOne"
                      className="sum_one sum_item"
                      value={sumOne}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="sumOnelt"
                      className="sum_one sum_item"
                      value={sumOnelt}
                      readOnly
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        II.
                        <u>
                          Đánh giá về ý thức và kết quả chấp hành nội quy, quy
                          chế của Trường
                        </u>
                      </span>{" "}
                      <span style={{ fontStyle: "italic" }}>
                        (Tổng điểm: 0 - 25 điểm)
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        1. Phần cộng điểm
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    a). Chấp hành tốt nội quy, quy chế của Trường, không vi phạm
                    kỷ luật….(+10đ)
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="svRightRule"
                      id=""
                      value="10"
                      onChange={handleChangeValue}
                      checked={checkboxState.svRightRule}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="ltRightRule"
                      id=""
                      value="10"
                      onChange={handleChangeValue}
                      checked={checkboxStateLT.ltRightRule}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    b). Kết quả học tập Tuần sinh hoạt công dân sinh viên
                  </td>
                </tr>

                <tr>
                  <td>
                    Điểm lần 1 ≥
                    90:………………...........................................................(+15đ)
                    <br /> Điểm lần 1 từ 65 đến 89
                    điểm:…...................................................(+10đ)
                    <br /> Điểm lần 1 từ 50 đến 65
                    điểm:….....................................................(+5đ)
                  </td>
                  <td>
                    <input
                      type="number"
                      name="svCitizen"
                      id=""
                      value={values.svCitizen}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="ltCitizen"
                      id=""
                      value={values.svCitizen}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        2. Phần trừ điểm
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    a). Không tham gia học tập đầy đủ, nghiêm túc nghị quyết,
                    nội quy, quy chế, tuần sinh hoạt công dân sinh
                    viên:..…....................................................(-10đ)
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="svNoFullStudy"
                      id=""
                      value="-10"
                      onChange={handleChangeValue}
                      checked={checkboxState.svNoFullStudy}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="ltNoFullStudy"
                      id=""
                      value="-10"
                      onChange={handleChangeValue}
                      checked={checkboxStateLT.ltNoFullStudy}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    b). Không đeo thẻ sinh viên trong khuôn viên
                    Trường:..............…....(-5đ/lần)
                  </td>
                  <td>
                    <select
                      name="svNoCard"
                      id="svNoCard"
                      value={values.svNoCard}
                      onChange={handleChangeSelect}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => {
                        return (
                          <option key={index} value={index * -5}>
                            {index}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td>
                    <select
                      name="ltNoCard"
                      id="ltNoCard"
                      value={valuesLT.ltNoCard}
                      onChange={handleChangeSelect}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => {
                        return (
                          <option key={index} value={index * -5}>
                            {index}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    c). Không tham gia các buổi sinh hoạt lớp, họp, hội nghị,
                    giao ban, tập huấn và các hoạt động khác khi Nhà trường yêu
                    cầu:..................................(-5đ/lần)
                  </td>
                  <td>
                    <select
                      name="svNoAtivities"
                      id="svNoAtivities"
                      value={values.svNoAtivities}
                      onChange={handleChangeSelect}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index * -5}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      name="ltNoAtivities"
                      id="ltNoAtivities"
                      value={valuesLT.ltNoAtivities}
                      onChange={handleChangeSelect}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index * -5}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    d). Đóng học phí không đúng quy định trong học
                    kỳ:….........................(-10đ)
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="svNoPayFee"
                      value="-10"
                      onChange={handleChangeValue}
                      checked={checkboxState.svNoPayFee}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="ltNoPayFee"
                      value="-10"
                      onChange={handleChangeValue}
                      checked={checkboxStateLT.ltNoPayFee}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    <h5>Cộng mục II</h5>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="sumTwo"
                      class="sum_two sum_item"
                      value={sumTwo}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="sumTwolt"
                      class="sum_two sum_item"
                      value={sumTwolt}
                      readOnly
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        III.
                        <u>
                          {" "}
                          Đánh giá về ý thức và kết quả tham gia các hoạt động
                          chính trị, xã hội, văn hoá, văn nghệ, thể thao, phòng
                          chống các tệ nạn xã hội
                        </u>
                      </span>{" "}
                      <span style={{ fontStyle: "italic" }}>
                        (Tổng điểm: 0 - 20 điểm)
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                        1. Phần cộng điểm
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    a). Tham gia đầy đủ các hoạt động, sinh hoạt do Trường,
                    Khoa, Lớp, Đoàn TN, Hội SV tổ
                    chức:......................................................................…….(+13đ)
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="svFullActive"
                      id=""
                      value="13"
                      onChange={handleChangeValue}
                      checked={checkboxState.svFullActive}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="ltFullActive"
                      id=""
                      value="13"
                      onChange={handleChangeValue}
                      checked={checkboxStateLT.ltFullActive}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    b). Có thành tích hoạt động chính trị, xã hội, văn hoá, văn
                    nghệ, thể thao, đoàn thể và đấu tranh phòng chống các tệ nạn
                    xã hội được tuyên dương, khen thưởng (lấy mức khen thưởng
                    cao nhất):
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Cấp Trường: ……………………….……………….……………...… (+3đ)
                  </td>
                  <td>
                    <input
                      type="number"
                      name="svAchievementSchool"
                      id=""
                      min="0"
                      max="3"
                      value={values.svAchievementSchool}
                      onChange={handleChangeInput}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="ltAchievementSchool"
                      id=""
                      min="0"
                      max="3"
                      value={valuesLT.ltAchievementSchool}
                      onChange={handleChangeInput}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Cấp tỉnh, thành phố trở
                    lên:……...……...………………..................... (+5đ)
                  </td>
                  <td>
                    <input
                      type="number"
                      name="svAchievementCity"
                      id=""
                      value={values.svAchievementCity}
                      min="0"
                      max="5"
                      onChange={handleChangeInput}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="ltAchievementCity"
                      id=""
                      value={valuesLT.ltAchievementCity}
                      min="0"
                      max="5"
                      onChange={handleChangeInput}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    c). Tham gia các hoạt động tư vấn tuyển sinh (có xác nhận
                    của phòng QHCC&DN):…………………………………………( +2đ/lần)
                  </td>
                  <td>
                    <select
                      name="svAdvise"
                      id="svAdvise"
                      value={values.svAdvise}
                      onChange={handleChangeSelect}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index * 2}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      name="ltAdvise"
                      id="ltAdvise"
                      value={valuesLT.ltAdvise}
                      onChange={handleChangeSelect}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index * 2}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                        2. Phần trừ điểm
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Không tham gia hoạt động, sinh hoạt khi được phân công:
                    ……….(-5đ/lần)
                  </td>
                  <td>
                    <select
                      name="svIrresponsible"
                      id="svIrresponsible"
                      value={values.svIrresponsible}
                      onChange={handleChangeSelect}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index * -5}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      name="ltIrresponsible"
                      id="ltIrresponsible"
                      value={valuesLT.ltIrresponsible}
                      onChange={handleChangeSelect}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index * -5}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Vi phạm Quy định về văn hoá học đường cho sinh
                    viên:.................(-5đ/lần)
                  </td>
                  <td>
                    <select
                      name="svNoCultural"
                      id="svNoCultural"
                      value={values.svNoCultural}
                      onChange={handleChangeSelect}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index * -5}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      name="ltNoCultural"
                      id="ltNoCultural"
                      value={valuesLT.ltNoCultural}
                      onChange={handleChangeSelect}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index * -5}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    <h5>Cộng mục III</h5>
                  </td>
                  <td>
                    <input
                      type="number"
                      class="sum_three sum_item"
                      value={sumThree}
                      name="sumThree"
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="sum_three sum_item"
                      value={sumThreelt}
                      name="sumThreelt"
                      readOnly
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        IV.
                        <u>
                          {" "}
                          Đánh giá về phẩm chất công dân và quan hệ công đồng{" "}
                        </u>
                      </span>{" "}
                      <span style={{ fontStyle: "italic" }}>
                        (Tổng điểm: 0 - 15 điểm)
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                        1. Phần cộng điểm
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    a). Tích cực tham gia học tập, tìm hiểu và chấp hành tốt chủ
                    trương của Đảng, chính sách, pháp luật của Nhà
                    nước:….........................................(+10đ)
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="svPositiveStudy"
                      id=""
                      value="10"
                      onChange={handleChangeValue}
                      checked={checkboxState.svPositiveStudy}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="ltPositiveStudy"
                      id=""
                      value="10"
                      onChange={handleChangeValue}
                      checked={checkboxStateLT.ltPositiveStudy}

                      // checked={valuesLT.ltPositiveStudy === 10}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    b). Tích cực tham gia các hoạt động nhân đạo, từ thiện vì
                    cộng đồng; phong trào thanh niên tình nguyện; phong trào
                    giúp đỡ nhân dân và bạn bè khi gặp thiên tai, khó khăn, hoạn
                    nạn:...................................................................(+5đ)
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="svPositiveLove"
                      id=""
                      value="5"
                      onChange={handleChangeValue}
                      checked={checkboxState.svPositiveLove}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="ltPositiveLove"
                      id=""
                      value="5"
                      onChange={handleChangeValue}
                      checked={checkboxStateLT.ltPositiveLove}

                      // checked={valuesLT.ltPositiveLove === 5}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                        2. Phần trừ điểm
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Gây mất đoàn kết trong tập thể
                    lớp:........................................................(-5đ)
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="svWarn"
                      id=""
                      value="-5"
                      onChange={handleChangeValue}
                      checked={checkboxState.svWarn}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="ltWarn"
                      id=""
                      value="-5"
                      onChange={handleChangeValue}
                      checked={checkboxStateLT.ltWarn}

                      // checked={valuesLT.ltWarn === -5}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Không đóng BHYT đúng hạn:
                    .............................................................(-20đ)
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="svNoProtect"
                      id=""
                      value="-20"
                      onChange={handleChangeValue}
                      checked={checkboxState.svNoProtect}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="ltNoProtect"
                      id=""
                      value="-20"
                      onChange={handleChangeValue}
                      checked={checkboxStateLT.ltNoProtect}

                      // checked={valuesLT.ltNoProtect === -20}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    <h5>Cộng mục IV</h5>
                  </td>
                  <td>
                    <input
                      type="number"
                      class="sum_four sum_item"
                      value={sumFour}
                      name="sumFour"
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="sum_four sum_item"
                      value={sumFourlt}
                      name="sumFourlt"
                      readOnly
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        V.
                        <u>
                          Đánh giá về ý thức và kết quả tham gia phụ trách lớp,
                          các đoàn thể tổ chức khác trong Trường
                        </u>
                      </span>{" "}
                      <span style={{ fontStyle: "italic" }}>
                        (Tổng điểm: 0 - 10 điểm)
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                        1. Phần cộng điểm
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    a). Là thành viên Ban cán sự lớp quản lý sinh viên, cán bộ
                    Đoàn TN, Hội SV hoàn thành nhiệm vụ:
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Lớp trưởng, Phó Bí thư Liên chi, Bí thư Chi
                    đoàn:…..…….................(+7đ)
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="svMonitor"
                      id=""
                      checked={values?.svMonitor === 7}
                      value="7"
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="ltMonitor"
                      id=""
                      checked={valuesLT?.ltMonitor === 7}
                      value="7"
                      readOnly
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Lớp phó, Phó Bí thư Chi đoàn, Hội trưởng Hội
                    SV:........…………......(+5đ)
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="svMonitor"
                      id=""
                      value="5"
                      checked={values?.svMonitor === 5}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="ltMonitor"
                      id=""
                      value="5"
                      checked={valuesLT?.ltMonitor === 5}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    b). Được các cấp khen thưởng:
                    ....….................….................………......(+3đ)
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="svBonus"
                      id=""
                      value="3"
                      onChange={handleChangeValue}
                      checked={checkboxState.svBonus}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="ltBonus"
                      id=""
                      value="3"
                      onChange={handleChangeValue}
                      checked={checkboxStateLT.ltBonus}

                      // checked={valuesLT.ltBonus === 3}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={`${colSpan}`}>
                    <p>
                      <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                        2. Phần trừ điểm
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Là thành viên Ban cán sự lớp quản lý sinh viên, lớp học
                    phần; cán bộ Đoàn TN, Hội SV thiếu trách nhiệm với tập thể
                    lớp:...................................(-5đ/lần)
                  </td>
                  <td>
                    <select
                      name="svIrresponsibleMonitor"
                      id="svIrresponsibleMonitor"
                      value={values.svIrresponsibleMonitor}
                      onChange={handleChangeSelect}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index * -5}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      name="ltIrresponsibleMonitor"
                      id="ltIrresponsibleMonitor"
                      value={valuesLT.ltIrresponsibleMonitor}
                      onChange={handleChangeSelect}
                      className="select"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index * -5}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    <h5>Cộng mục V</h5>
                  </td>
                  <td>
                    <input
                      type="number"
                      class="sum_five sum_item"
                      value={sumFive}
                      name="sumFive"
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="sum_five sum_item"
                      value={sumFivelt}
                      name="sumFivelt"
                      readOnly
                    />
                  </td>
                </tr>

                <tr class="sum_all">
                  <td>
                    <h5 style={{ color: "red", width: "70px" }}>Tổng: </h5>
                  </td>
                  <td>
                    <input type="number" class="sum_mark-student" value={sum} />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="sum_mark-student"
                      value={sumlt}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* <span className="absolute top-[50%] right-0">
              Duyệt
              <input
                type="checkbox"
                name=""
                id="checkBox"
                className="btn_checkbox"
                // onClick={handleDuyet}
              />
            </span> */}
            <Button
              disableElevation={true}
              variant="contained"
              color="secondary"
              style={{
                position: "fixed",
                top: "75px",
                right: "10px",
                cursor: "default",
              }}
            >
              TBHK:{" "}
              {pointCitizenMediumData?.point_average
                ? pointCitizenMediumData?.point_average
                : ""}
              <br /> CDSV:
              {pointCitizenMediumData?.point
                ? pointCitizenMediumData?.point
                : ""}
            </Button>
            <Button
              disableElevation={true}
              variant="contained"
              color="secondary"
              style={{
                position: "fixed",
                bottom: "120px",
                right: "15px",
                cursor: "default",
                padding: "9px 23px",
              }}
            >
              Tổng:{sum}
            </Button>
            <Button
              disableElevation={true}
              variant="contained"
              color="secondary"
              style={{
                position: "fixed",
                bottom: "70px",
                right: "15px",
                cursor: "default",
                padding: "9px 15px",
              }}
            >
              TổngLT:{sumlt}
            </Button>
            <input
              type="checkbox"
              name="svPositiveStudy"
              onClick={(e) => handleClickDuyet(e)}
              style={{
                position: "fixed",
                bottom: "180px",
                right: "15px",
                cursor: "default",
                padding: "9px 15px",
                width: "auto",
              }}
            />
            <div
              className={`flex justify-end bg-[#191f4589] px-4 py-3 w-full absolute bottom-0`}
            >
              {
                <button
                  type="button"
                  className={`w-[30%] mt-3 inline-flex justify-center rounded-md  px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0 sm:w-auto`}
                  onClick={handleSubmit}
                >
                  Lưu
                </button>
              }
            </div>
          </form>
        </div>
      </Box>
    </Box>
  );
};

export default DuyetDiemRenLuyenLT;
