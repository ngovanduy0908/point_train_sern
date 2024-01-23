import { Box } from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import Input from "components/input/Input";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { getPointMonitorByMaSVAndMaHK } from "utils/getDetails/getPointMonitorByMa";
import { getPointTeacherByMa } from "utils/getDetails/getPointTeacherByMa";
import { insertOrUpdatePointTeacher } from "utils/postDetails/insertOrUpdatePointTeacher";
import { getGvNote } from "utils/getDetails/getGvNote";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const colSpan = 4;

const DuyetDiemRenLuyenGV = ({ sinhVienItem, fetchData, setOpen }) => {
  const maSv = sinhVienItem.maSv;
  // const navigate = useNavigate();
  const { maHK } = useParams();

  const [studentData, setStudentData] = useState([]);
  const [data, setData] = useState([]);
  const [pointCitizenMediumData, setCitizenMediumPointData] = useState({});
  const [pointStudentData, setPointStudentData] = useState({});
  const [note, setNote] = useState("");

  //   value student
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
  // value student

  // value monitor
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

  // value monitor

  // value teacher
  const [valuesGV, setValuesGV] = useState({
    // muc 1
    gvDiemTBHK: pointCitizenMediumData.gvDiemTBHK
      ? pointCitizenMediumData.gvDiemTBHK
      : 0,
    gvNCKH1: pointCitizenMediumData.gvNCKH1
      ? pointCitizenMediumData.gvNCKH1
      : 0,
    gvNCKH2: pointCitizenMediumData.gvNCKH2
      ? pointCitizenMediumData.gvNCKH2
      : 0,
    gvNCKH3: pointCitizenMediumData.gvNCKH3
      ? pointCitizenMediumData.gvNCKH3
      : 0,
    gvOlympic1: pointCitizenMediumData.gvOlympic1
      ? pointCitizenMediumData.gvOlympic1
      : 0,
    gvOlympic2: pointCitizenMediumData.gvOlympic2
      ? pointCitizenMediumData.gvOlympic2
      : 0,
    gvOlympic3: pointCitizenMediumData.gvOlympic3
      ? pointCitizenMediumData.gvOlympic3
      : 0,
    gvOlympic4: pointCitizenMediumData.gvOlympic4
      ? pointCitizenMediumData.gvOlympic4
      : 0,
    gvNoRegulation: pointCitizenMediumData.gvNoRegulation
      ? pointCitizenMediumData.gvNoRegulation
      : 0,
    gvOnTime: pointCitizenMediumData.gvOnTime
      ? pointCitizenMediumData.gvOnTime
      : 0,
    gvAbandon: pointCitizenMediumData.gvAbandon
      ? pointCitizenMediumData.gvAbandon
      : 0,
    gvUnTrueTime: pointCitizenMediumData.gvUnTrueTime
      ? pointCitizenMediumData.gvUnTrueTime
      : 0,

    // muc 2
    gvRightRule: 0,
    gvCitizen: 0,
    gvNoFullStudy: 0,
    gvNoCard: 0,
    gvNoAtivities: 0,
    gvNoPayFee: 0,

    // muc 3
    gvFullActive: 0,
    gvAchievementCity: 0,
    gvAchievementSchool: 0,
    gvAdvise: 0,
    gvIrresponsible: 0,
    gvNoCultural: 0,

    // muc 4
    gvPositiveStudy: 0,
    gvPositiveLove: 0,
    gvWarn: 0,
    gvNoProtect: 0,

    // muc 5
    gvMonitor: 0,
    gvBonus: 0,
    gvIrresponsibleMonitor: 0,
  });
  // value teacher

  // checkbox state
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

  const [checkboxStateGV, setCheckboxStateGV] = useState({
    gvNoRegulation: false,
    gvOnTime: false,
    gvRightRule: false,
    gvNoFullStudy: false,
    gvNoPayFee: false,
    gvFullActive: false,
    gvPositiveStudy: false,
    gvPositiveLove: false,
    gvWarn: false,
    gvNoProtect: false,
    gvMonitor: false,
    gvBonus: false,
  });
  // checkbox state

  const getSv = async () => {
    try {
      const getOneSv = await axios.get(
        `${DOMAIN}/students/get_one_sv/${maHK}/${sinhVienItem.maSv}`,
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

  const getNote = async () => {
    try {
      const res = await getGvNote(`maSv=${maSv}&maHK=${maHK}`);
      // console.log("res: ", res.gvNote);
      setNote(res.gvNote);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getPointCitizenMediumSv = async () => {
    try {
      const getCitizenMediumPoint = await axios.get(
        `${DOMAIN}/points/get_citizen_medium/${maHK}/${sinhVienItem.maSv}`,
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
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const checkExisPointMonitor = async () => {
    try {
      const getMonitorPoint = await getPointMonitorByMaSVAndMaHK(
        `maHK=${maHK}&maSv=${maSv}`
      );
      if (getMonitorPoint) {
        const pointMonitor = getMonitorPoint;
        console.log("pointMonitor: ", pointMonitor);
        setValuesLT((prev) => ({
          ...prev,
          // muc 1
          ltDiemTBHK: pointMonitor.ltDiemTBHK,
          ltNCKH1: pointMonitor.ltNCKH1,
          ltNCKH2: pointMonitor.ltNCKH2,
          ltNCKH3: pointMonitor.ltNCKH3,
          ltOlympic1: pointMonitor.ltOlympic1,
          ltOlympic2: pointMonitor.ltOlympic2,
          ltOlympic3: pointMonitor.ltOlympic3,
          ltOlympic4: pointMonitor.ltOlympic4,
          ltNoRegulation: pointMonitor.ltNoRegulation,
          ltOnTime: pointMonitor.ltOnTime,
          ltAbandon: pointMonitor.ltAbandon,
          ltUnTrueTime: pointMonitor.ltUnTrueTime,

          // muc 2
          ltRightRule: pointMonitor.ltRightRule,
          ltCitizen: pointMonitor.ltCitizen,
          ltNoFullStudy: pointMonitor.ltNoFullStudy,
          ltNoCard: pointMonitor.ltNoCard,
          ltNoAtivities: pointMonitor.ltNoAtivities,
          ltNoPayFee: pointMonitor.ltNoPayFee,

          // muc 3
          ltFullActive: pointMonitor.ltFullActive,
          ltAchievementCity: pointMonitor.ltAchievementCity,
          ltAchievementSchool: pointMonitor.ltAchievementSchool,
          ltAdvise: pointMonitor.ltAdvise,
          ltIrresponsible: pointMonitor.ltIrresponsible,
          ltNoCultural: pointMonitor.ltNoCultural,

          // muc 4
          ltPositiveStudy: pointMonitor.ltPositiveStudy,
          ltPositiveLove: pointMonitor.ltPositiveLove,
          ltWarn: pointMonitor.ltWarn,
          ltNoProtect: pointMonitor.ltNoProtect,

          // muc 5
          ltMonitor: pointMonitor.ltMonitor,
          ltBonus: pointMonitor.ltBonus,
          ltIrresponsibleMonitor: pointMonitor.ltIrresponsibleMonitor,
        }));
        setValuesGV((prev) => ({
          ...prev,
          // muc 1
          gvDiemTBHK: pointMonitor.ltDiemTBHK,
          gvNCKH1: pointMonitor.ltNCKH1,
          gvNCKH2: pointMonitor.ltNCKH2,
          gvNCKH3: pointMonitor.ltNCKH3,
          gvOlympic1: pointMonitor.ltOlympic1,
          gvOlympic2: pointMonitor.ltOlympic2,
          gvOlympic3: pointMonitor.ltOlympic3,
          gvOlympic4: pointMonitor.ltOlympic4,
          gvNoRegulation: pointMonitor.ltNoRegulation,
          gvOnTime: pointMonitor.ltOnTime,
          gvAbandon: pointMonitor.ltAbandon,
          gvUnTrueTime: pointMonitor.ltUnTrueTime,

          // muc 2
          gvRightRule: pointMonitor.ltRightRule,
          gvCitizen: pointMonitor.ltCitizen,
          gvNoFullStudy: pointMonitor.ltNoFullStudy,
          gvNoCard: pointMonitor.ltNoCard,
          gvNoAtivities: pointMonitor.ltNoAtivities,
          gvNoPayFee: pointMonitor.ltNoPayFee,

          // muc 3
          gvFullActive: pointMonitor.ltFullActive,
          gvAchievementCity: pointMonitor.ltAchievementCity,
          gvAchievementSchool: pointMonitor.ltAchievementSchool,
          gvAdvise: pointMonitor.ltAdvise,
          gvIrresponsible: pointMonitor.ltIrresponsible,
          gvNoCultural: pointMonitor.ltNoCultural,

          // muc 4
          gvPositiveStudy: pointMonitor.ltPositiveStudy,
          gvPositiveLove: pointMonitor.ltPositiveLove,
          gvWarn: pointMonitor.ltWarn,
          gvNoProtect: pointMonitor.ltNoProtect,

          // muc 5
          gvMonitor: pointMonitor.ltMonitor,
          gvBonus: pointMonitor.ltBonus,
          gvIrresponsibleMonitor: pointMonitor.ltIrresponsibleMonitor,
        }));
        setCheckboxStateLT((prev) => ({
          ...prev,
          ltNoRegulation: pointMonitor.ltNoRegulation === 3 ? true : false,
          ltOnTime: pointMonitor.ltOnTime === 2 ? true : false,
          ltRightRule: pointMonitor.ltRightRule === 10 ? true : false,
          ltNoFullStudy: pointMonitor.ltNoFullStudy === -10 ? true : false,
          ltNoPayFee: pointMonitor.ltNoPayFee === -10 ? true : false,
          ltFullActive: pointMonitor.ltFullActive === 13 ? true : false,
          ltPositiveStudy: pointMonitor.ltPositiveStudy === 10 ? true : false,
          ltPositiveLove: pointMonitor.ltPositiveLove === 5 ? true : false,
          ltWarn: pointMonitor.ltWarn === -5 ? true : false,
          ltNoProtect: pointMonitor.ltNoProtect === -20 ? true : false,
          ltBonus: pointMonitor.ltBonus === 3 ? true : false,
        }));
        setCheckboxStateGV((prev) => ({
          ...prev,
          gvNoRegulation: pointMonitor.ltNoRegulation === 3 ? true : false,
          gvOnTime: pointMonitor.ltOnTime === 2 ? true : false,
          gvRightRule: pointMonitor.ltRightRule === 10 ? true : false,
          gvNoFullStudy: pointMonitor.ltNoFullStudy === -10 ? true : false,
          gvNoPayFee: pointMonitor.ltNoPayFee === -10 ? true : false,
          gvFullActive: pointMonitor.ltFullActive === 13 ? true : false,
          gvPositiveStudy: pointMonitor.ltPositiveStudy === 10 ? true : false,
          gvPositiveLove: pointMonitor.ltPositiveLove === 5 ? true : false,
          gvWarn: pointMonitor.ltWarn === -5 ? true : false,
          gvNoProtect: pointMonitor.ltNoProtect === -20 ? true : false,
          gvBonus: pointMonitor.ltBonus === 3 ? true : false,
        }));
        // console.log("pointMonitor: ", pointMonitor);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkExisPoint();
    checkExisPointMonitor();
    getSv();
    getPointCitizenMediumSv();
    getNote();
  }, []);

  const checkExisPointTeacher = async () => {
    try {
      const res = await getPointTeacherByMa(`maHK=${maHK}&maSv=${maSv}`);
      // console.log('res: ', res);
      if (res) {
        setValuesGV((prev) => ({
          ...prev,
          // muc 1
          gvDiemTBHK: res.gvDiemTBHK,
          gvNCKH1: res.gvNCKH1,
          gvNCKH2: res.gvNCKH2,
          gvNCKH3: res.gvNCKH3,
          gvOlympic1: res.gvOlympic1,
          gvOlympic2: res.gvOlympic2,
          gvOlympic3: res.gvOlympic3,
          gvOlympic4: res.gvOlympic4,
          gvNoRegulation: res.gvNoRegulation,
          gvOnTime: res.gvOnTime,
          gvAbandon: res.gvAbandon,
          gvUnTrueTime: res.gvUnTrueTime,

          // muc 2
          gvRightRule: res.gvRightRule,
          gvCitizen: res.gvCitizen,
          gvNoFullStudy: res.gvNoFullStudy,
          gvNoCard: res.gvNoCard,
          gvNoAtivities: res.gvNoAtivities,
          gvNoPayFee: res.gvNoPayFee,

          // muc 3
          gvFullActive: res.gvFullActive,
          gvAchievementCity: res.gvAchievementCity,
          gvAchievementSchool: res.gvAchievementSchool,
          gvAdvise: res.gvAdvise,
          gvIrresponsible: res.gvIrresponsible,
          gvNoCultural: res.gvNoCultural,

          // muc 4
          gvPositiveStudy: res.gvPositiveStudy,
          gvPositiveLove: res.gvPositiveLove,
          gvWarn: res.gvWarn,
          gvNoProtect: res.gvNoProtect,

          // muc 5
          gvMonitor: res.gvMonitor,
          gvBonus: res.gvBonus,
          gvIrresponsibleMonitor: res.gvIrresponsibleMonitor,
        }));
        setCheckboxStateGV((prev) => ({
          ...prev,
          gvNoRegulation: res.gvNoRegulation === 3 ? true : false,
          gvOnTime: res.gvOnTime === 2 ? true : false,
          gvRightRule: res.gvRightRule === 10 ? true : false,
          gvNoFullStudy: res.gvNoFullStudy === -10 ? true : false,
          gvNoPayFee: res.gvNoPayFee === -10 ? true : false,
          gvFullActive: res.gvFullActive === 13 ? true : false,
          gvPositiveStudy: res.gvPositiveStudy === 10 ? true : false,
          gvPositiveLove: res.gvPositiveLove === 5 ? true : false,
          gvWarn: res.gvWarn === -5 ? true : false,
          gvNoProtect: res.gvNoProtect === -20 ? true : false,
          gvBonus: res.gvBonus === 3 ? true : false,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkExisPointTeacher();
  }, []);

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

    setValuesGV((prev) => ({
      ...prev,
      gvDiemTBHK: changeValueTBHK,
      gvCitizen: changeValueCitizen,
      gvMonitor: changeSvMonitor,
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

  //   start sum tong giao vien
  const sum1gv =
    parseInt(valuesGV.gvDiemTBHK) +
    parseInt(valuesGV.gvNCKH1) +
    parseInt(valuesGV.gvNCKH2) +
    parseInt(valuesGV.gvNCKH3) +
    parseInt(valuesGV.gvOlympic1) +
    parseInt(valuesGV.gvOlympic2) +
    parseInt(valuesGV.gvOlympic3) +
    parseInt(valuesGV.gvOlympic4) +
    parseInt(valuesGV.gvNoRegulation) +
    parseInt(valuesGV.gvOnTime) +
    parseInt(valuesGV.gvAbandon) +
    parseInt(valuesGV.gvUnTrueTime);

  const sum2gv =
    parseInt(valuesGV.gvRightRule) +
    parseInt(valuesGV.gvCitizen) +
    parseInt(valuesGV.gvNoFullStudy) +
    parseInt(valuesGV.gvNoCard) +
    parseInt(valuesGV.gvNoAtivities) +
    parseInt(valuesGV.gvNoPayFee);

  const sum3gv =
    parseInt(valuesGV.gvFullActive) +
    parseInt(valuesGV.gvAchievementCity) +
    parseInt(valuesGV.gvAchievementSchool) +
    parseInt(valuesGV.gvAdvise) +
    parseInt(valuesGV.gvIrresponsible) +
    parseInt(valuesGV.gvNoCultural);

  const sum4gv =
    parseInt(valuesGV.gvPositiveStudy) +
    parseInt(valuesGV.gvPositiveLove) +
    parseInt(valuesGV.gvWarn) +
    parseInt(valuesGV.gvNoProtect);

  const sum5gv =
    parseInt(valuesGV.gvMonitor) +
    parseInt(valuesGV.gvBonus) +
    parseInt(valuesGV.gvIrresponsibleMonitor);

  const [sumgv, setSumgv] = useState(
    sum1gv + sum2gv + sum3gv + sum4gv + sum5gv
  );

  const [sumOnegv, setSumOnegv] = useState(sum1gv);
  const [sumTwogv, setSumTwogv] = useState(sum2gv);
  const [sumThreegv, setSumThreegv] = useState(sum3gv);
  const [sumFourgv, setSumFourgv] = useState(sum4gv);
  const [sumFivegv, setSumFivegv] = useState(sum5lt);
  // end sum tong giao vien
  const handleChangeValue = (e) => {
    const { name, value, checked } = e.target;

    setValuesGV((prev) => ({
      ...prev,
      [name]: checked ? value : 0,
    }));
    setCheckboxStateGV((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleChangeSelect = (e) => {
    const { name, value } = e.target;
    setValuesGV((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log("name: ", name);
    setValuesGV((prevValues) => ({
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
    setSumOnelt(sum1);

    const sum2 =
      parseInt(valuesLT.ltRightRule) +
      parseInt(valuesLT.ltCitizen) +
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
      parseInt(valuesLT.ltMonitor) +
      parseInt(valuesLT.ltBonus) +
      parseInt(valuesLT.ltIrresponsibleMonitor);
    setSumFivelt(sum5);

    const sum = sum1 + sum2 + sum3 + sum4 + sum5;
    setSumlt(sum);
    // console.log("thay doi");
  }, [valuesLT]);
  // end sum lop truong

  // start sum giao vien
  useEffect(() => {
    const sum1 =
      parseInt(valuesGV.gvDiemTBHK) +
      parseInt(valuesGV.gvNCKH1) +
      parseInt(valuesGV.gvNCKH2) +
      parseInt(valuesGV.gvNCKH3) +
      parseInt(valuesGV.gvOlympic1) +
      parseInt(valuesGV.gvOlympic2) +
      parseInt(valuesGV.gvOlympic3) +
      parseInt(valuesGV.gvOlympic4) +
      parseInt(valuesGV.gvNoRegulation) +
      parseInt(valuesGV.gvOnTime) +
      parseInt(valuesGV.gvAbandon) +
      parseInt(valuesGV.gvUnTrueTime);
    setSumOnegv(sum1);

    const sum2 =
      parseInt(valuesGV.gvRightRule) +
      parseInt(valuesGV.gvCitizen) +
      parseInt(valuesGV.gvNoFullStudy) +
      parseInt(valuesGV.gvNoCard) +
      parseInt(valuesGV.gvNoAtivities) +
      parseInt(valuesGV.gvNoPayFee);

    setSumTwogv(sum2);

    const sum3 =
      parseInt(valuesGV.gvFullActive) +
      parseInt(valuesGV.gvAchievementCity) +
      parseInt(valuesGV.gvAchievementSchool) +
      parseInt(valuesGV.gvAdvise) +
      parseInt(valuesGV.gvIrresponsible) +
      parseInt(valuesGV.gvNoCultural);
    setSumThreegv(sum3);

    const sum4 =
      parseInt(valuesGV.gvPositiveStudy) +
      parseInt(valuesGV.gvPositiveLove) +
      parseInt(valuesGV.gvWarn) +
      parseInt(valuesGV.gvNoProtect);
    setSumFourgv(sum4);

    const sum5 =
      parseInt(valuesGV.gvMonitor) +
      parseInt(valuesGV.gvBonus) +
      parseInt(valuesGV.gvIrresponsibleMonitor);
    setSumFivegv(sum5);

    const sum = sum1 + sum2 + sum3 + sum4 + sum5;
    setSumgv(sum);
    // console.log("thay doi");
  }, [valuesGV]);

  // end sum giao vien

  const handleSubmit = async () => {
    try {
      const data = {
        ...valuesGV,
        // note: gvNote?.trim(),
        note,
        sum: sumgv,
      };
      console.log("gv note: ", note);
      console.log("gv data: ", data);

      await insertOrUpdatePointTeacher(`maHK=${maHK}&maSv=${maSv}`, data);
      fetchData();
      setOpen(false);
      toast.success("Duyệt Điểm Rèn Luyện Thành Công", {
        autoClose: 2000,
      });
      // console.log("vao day: ", values);
    } catch (error) {
      console.log(error);
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
                  <th>Điểm do hội đồng Khoa đánh giá</th>

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
                  <td>
                    <input
                      type="number"
                      name="gvDiemTBHK"
                      id=""
                      value={valuesLT.ltDiemTBHK}
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
                  <td>
                    <input
                      type="number"
                      name="gvNCKH1"
                      id=""
                      min="0"
                      max="8"
                      value={valuesGV.gvNCKH1}
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
                  <td>
                    <Input
                      type="number"
                      name="gvNCKH2"
                      id=""
                      min="0"
                      max="6"
                      value={valuesGV.gvNCKH2}
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
                  <td>
                    <Input
                      type="number"
                      name="gvNCKH3"
                      id=""
                      min="0"
                      max="6"
                      value={valuesGV.gvNCKH3}
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
                  <td>
                    <Input
                      type="number"
                      name="gvOlympic1"
                      id=""
                      min="0"
                      max="10"
                      value={valuesGV.gvOlympic1}
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
                  <td>
                    <Input
                      type="number"
                      name="gvOlympic2"
                      id=""
                      min="0"
                      max="6"
                      value={valuesGV.gvOlympic2}
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
                  <td>
                    <input
                      type="number"
                      name="gvOlympic3"
                      id=""
                      min="0"
                      max="5"
                      value={valuesGV.gvOlympic3}
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
                  <td>
                    <Input
                      type="number"
                      name="gvOlympic4"
                      id=""
                      min="0"
                      max="2"
                      value={valuesGV.gvOlympic4}
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
                  <td>
                    <input
                      type="checkbox"
                      name="gvNoRegulation"
                      id=""
                      value="3"
                      onChange={handleChangeValue}
                      checked={checkboxStateGV.gvNoRegulation}
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
                    <td>
                      <input
                        type="checkbox"
                        name="gvOnTime"
                        id=""
                        value="2"
                        onChange={handleChangeValue}
                        checked={checkboxStateGV.gvOnTime}
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
                  <td>
                    <Input
                      type="number"
                      name="gvAbandon"
                      id=""
                      min="-15"
                      max="0"
                      value={valuesGV.gvAbandon}
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
                  <td>
                    <select
                      name="gvUnTrueTime"
                      id="gvUnTrueTime"
                      onChange={handleChangeSelect}
                      value={valuesGV.gvUnTrueTime}
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
                  <td>
                    <input
                      type="number"
                      name="sumOnegv"
                      className="sum_one sum_item"
                      value={sumOnegv}
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
                  <td>
                    <input
                      type="checkbox"
                      name="gvRightRule"
                      id=""
                      value="10"
                      onChange={handleChangeValue}
                      checked={checkboxStateGV.gvRightRule}
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
                  <td>
                    <input
                      type="number"
                      name="gvCitizen"
                      id=""
                      value={valuesLT.ltCitizen}
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

                  <td>
                    <input
                      type="checkbox"
                      name="gvNoFullStudy"
                      id=""
                      value="-10"
                      onChange={handleChangeValue}
                      checked={checkboxStateGV.gvNoFullStudy}
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
                  <td>
                    <select
                      name="gvNoCard"
                      id="gvNoCard"
                      value={valuesGV.gvNoCard}
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
                  <td>
                    <select
                      name="gvNoAtivities"
                      id="gvNoAtivities"
                      value={valuesGV.gvNoAtivities}
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
                  <td>
                    <input
                      type="checkbox"
                      name="gvNoPayFee"
                      value="-10"
                      onChange={handleChangeValue}
                      checked={checkboxStateGV.gvNoPayFee}
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
                  <td>
                    <input
                      type="number"
                      name="sumTwogv"
                      class="sum_two sum_item"
                      value={sumTwogv}
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
                  <td>
                    <input
                      type="checkbox"
                      name="gvFullActive"
                      id=""
                      value="13"
                      onChange={handleChangeValue}
                      checked={checkboxStateGV.gvFullActive}
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
                  <td>
                    <input
                      type="number"
                      name="gvAchievementSchool"
                      id=""
                      min="0"
                      max="3"
                      value={valuesGV.gvAchievementSchool}
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
                  <td>
                    <input
                      type="number"
                      name="gvAchievementCity"
                      id=""
                      value={valuesGV.gvAchievementCity}
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
                  <td>
                    <select
                      name="gvAdvise"
                      id="gvAdvise"
                      value={valuesGV.gvAdvise}
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

                  <td>
                    <select
                      name="gvIrresponsible"
                      id="gvIrresponsible"
                      value={valuesGV.gvIrresponsible}
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

                  <td>
                    <select
                      name="gvNoCultural"
                      id="gvNoCultural"
                      value={valuesGV.gvNoCultural}
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
                  <td>
                    <input
                      type="number"
                      class="sum_three sum_item"
                      value={sumThreegv}
                      name="sumThreegv"
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
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="gvPositiveStudy"
                      id=""
                      value="10"
                      onChange={handleChangeValue}
                      checked={checkboxStateGV.gvPositiveStudy}
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
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="gvPositiveLove"
                      id=""
                      value="5"
                      onChange={handleChangeValue}
                      checked={checkboxStateGV.gvPositiveLove}
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
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="gvWarn"
                      id=""
                      value="-5"
                      onChange={handleChangeValue}
                      checked={checkboxStateGV.gvWarn}
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
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="gvNoProtect"
                      id=""
                      value="-20"
                      onChange={handleChangeValue}
                      checked={checkboxStateGV.gvNoProtect}
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
                  <td>
                    <input
                      type="number"
                      class="sum_four sum_item"
                      value={sumFourgv}
                      name="sumFourgv"
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
                  <td>
                    <input
                      type="radio"
                      name="gvMonitor"
                      id=""
                      checked={valuesGV?.gvMonitor === 7}
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
                  <td>
                    <input
                      type="radio"
                      name="gvMonitor"
                      id=""
                      value="5"
                      checked={valuesGV?.gvMonitor === 5}
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
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="gvBonus"
                      id=""
                      value="3"
                      onChange={handleChangeValue}
                      checked={checkboxStateGV.gvBonus}
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
                  <td>
                    <select
                      name="gvIrresponsibleMonitor"
                      id="gvIrresponsibleMonitor"
                      value={valuesGV.gvIrresponsibleMonitor}
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
                  <td>
                    <input
                      type="number"
                      class="sum_five sum_item"
                      value={sumFivegv}
                      name="sumFivegv"
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
                  <td>
                    <input
                      type="number"
                      class="sum_mark-student"
                      value={sumgv}
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
            <TextField
              id="outlined-multiline-flexible"
              label="Ghi chú"
              multiline
              maxRows={4}
              fullWidth
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </form>
        </div>
      </Box>
    </Box>
  );
};

export default DuyetDiemRenLuyenGV;
