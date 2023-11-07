import { Box } from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import { getUserInLocalStorage } from "context/getCurrentUser";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/css/grid.css";
import "./phieu.css";
import Modal from "components/modal/Modal";
import UploadProofStudent from "./UploadProofStudent";
import Input from "components/input/Input";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const Mark = () => {
  // console.log("DOMAIN: ", DOMAIN);
  const currentUser = getUserInLocalStorage();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const maHK = pathname.split("/")[2];
  const maSv = currentUser.maSv;
  //   console.log(maHK);
  const [studentData, setStudentData] = useState([]);
  const [data, setData] = useState([]);
  const [pointCitizenMediumData, setCitizenMediumPointData] = useState({});
  const [pointStudentData, setPointStudentData] = useState({});
  const [openModalProof, setOpenModalProof] = useState(false);

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

  // console.log(values);
  const checkExisPoint = async () => {
    try {
      const getStudentPoint = await axios.get(
        `${DOMAIN}/points/get_point_student/${maHK}/${currentUser.maSv}`,
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

  useEffect(() => {
    checkExisPoint();

    getSv();
    getPointCitizenMediumSv();
  }, []);

  // console.log("values: ", values);
  // console.log("checkboxState: ", checkboxState);

  const getSv = async () => {
    try {
      const getOneSv = await axios.get(
        `http://localhost:8800/api/students/get_one_sv/${maHK}/${currentUser.maSv}`,
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
        `http://localhost:8800/api/points/get_citizen_medium/${maHK}/${currentUser.maSv}`,
        {
          withCredentials: true,
        }
      );
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
    setValues((prev) => ({
      ...prev,
      svDiemTBHK: changeValueTBHK,
      svCitizen: changeValueCitizen,
      svMonitor: changeSvMonitor,
    }));
  }, [pointCitizenMediumData, studentData]);

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

  const handleChangeValue = (e) => {
    const { name, value, checked } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: checked ? value : 0,
    }));
    setCheckboxState((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleChangeSelect = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value ? value : 0,
    }));
  };
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

  /*
Ở đây, ta dùng destructuring để lấy ra các giá trị của name, checked và value của input element. 
Sau đó, ta sử dụng setValues để cập nhật giá trị của values với name của checkbox hiện tại và giá trị của value nếu checkbox được checked, hoặc 0 nếu checkbox không được checked.

Tiếp theo, ta sử dụng setSumOne để tính lại giá trị của sumOne. Để tính lại giá trị của sumOne, ta sẽ lấy giá trị hiện tại của sumOne và cộng với giá trị mới của checkbox hiện tại (nếu được checked), trừ đi giá trị cũ của checkbox hiện tại. Lưu ý rằng ta phải sử dụng parseInt để chuyển đổi giá trị sang kiểu số nguyên.
  */

  const handleSubmit = async () => {
    const data = {
      ...values,
      sum: sum,
    };
    try {
      await axios.post(
        `http://localhost:8800/api/points/insert_or_update/${maHK}/${currentUser.maSv}`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.success("Chấm điểm rèn luyện thành công", {
        autoClose: 2000,
      });
      navigate(`/chamdiemrenluyen/${maHK}/after_mark`);
    } catch (error) {
      toast.success("Cham Diem Ren Luyen That Bai", {
        autoClose: 2000,
      });
      console.log(error.message);
    }
  };
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [handleChangeFile, setHandleChangeFile] = useState(false);
  const [chooseFiles, setChooseFiles] = useState([]);

  const handleUpload = async () => {
    // TODO khi file change thì mới call api upload img
    let file_img = null;
    let choose_file = chooseFiles;
    // console.log("choose_file: ", choose_file);
    if (handleChangeFile) {
      try {
        console.log("change file: ", selectedFiles);
        // console.log("change file v1: ", selectedFiles);

        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("images", file);
        });
        await axios.post(`${DOMAIN}/upload`, formData).then(async (res) => {
          file_img = res.data.join(",");
          choose_file = [...chooseFiles, file_img];
          const values = {
            name_image: choose_file.length ? choose_file.join(",") : "",
            maSv: maSv,
          };
          console.log("values: ", choose_file);
          await axios
            .post(
              `${DOMAIN}/proof_mark/create_or_update_proof/${maHK}`,
              values,
              {
                withCredentials: true,
              }
            )
            .then(async (res) => {
              toast.success(res.data);
            });
        });
      } catch (error) {
        console.error("Upload error:", error);
      }
    } else {
      try {
        const values = {
          name_image: chooseFiles.length ? chooseFiles.join(",") : "",
          maSv: maSv,
        };
        console.log("values moi: ", values);
        await axios
          .post(`${DOMAIN}/proof_mark/create_or_update_proof/${maHK}`, values, {
            withCredentials: true,
          })
          .then(async (res) => {
            toast.success(res.data);
          });
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  useEffect(() => {
    if (openModalProof === false) {
      setHandleChangeFile(false);
    }
  }, [openModalProof]);

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
      {/* <BasicModal /> */}
      <button onClick={() => setOpenModalProof(true)} className="mb-2">
        Nhập/Xem Minh Chứng
      </button>
      <Modal
        open={openModalProof}
        setOpen={setOpenModalProof}
        classNameChildren={"w-[800px]"}
        displayButtonOk={false}
        displayButtonCancel={false}
        title="Upload Minh Chứng"
      >
        <UploadProofStudent
          maHK={maHK}
          maSv={currentUser.maSv}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          handleChangeFile={handleChangeFile}
          setHandleChangeFile={setHandleChangeFile}
          chooseFiles={chooseFiles}
          setChooseFiles={setChooseFiles}
          handleUpload={handleUpload}
        />
      </Modal>
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
                  <td colSpan="2">
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
                  <td colSpan="2">
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
                  <td colSpan="2">a). Kết quả học tập:</td>
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
                      // onChange={handleChangeValue}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
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
                </tr>

                <tr>
                  <td width="70%">
                    - Đạt giải NCKH cấp Trường, Tiểu ban chuyên môn tối đa:
                    ………..... (+6đ)
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="svNCKH2"
                      id=""
                      min="0"
                      max="6"
                      value={values.svNCKH2}
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
                      // value="<?= $svNCKH3 ?>"
                      min="0"
                      max="6"
                      value={values.svNCKH3}
                      onChange={handleChangeInput}
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
                      // value="<?= $svOlympic1 ?>"
                      min="0"
                      max="10"
                      value={values.svOlympic1}
                      onChange={handleChangeInput}
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
                      // value="<?= $svOlympic2 ?>"
                      min="0"
                      max="6"
                      value={values.svOlympic2}
                      onChange={handleChangeInput}
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
                      // value="<?= $svOlympic3 ?>"
                      min="0"
                      max="5"
                      value={values.svOlympic3}
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
                      // value="<?= $svOlympic4 ?>"
                      min="0"
                      max="2"
                      value={values.svOlympic4}
                      onChange={handleChangeInput}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
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
                      // checked={1 === 1 ? true : false}
                      checked={checkboxState.svNoRegulation}
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
                  </tr>
                )}

                <tr>
                  <td colSpan="2">
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
                </tr>

                <tr>
                  <td colSpan="2">
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
                  <td colSpan="2">
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
                </tr>

                <tr>
                  <td colSpan="2">
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
                      // onChange={handleChangeValue}
                    />
                  </td>
                </tr>

                {/* <tr>
                  <td width="70%">
                    Điểm lần 1 ≥
                    90:………………...........................................................(+15đ)
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="svCitizen"
                      id=""
                      value="15"
                      onChange={handleChangeValue}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    Điểm lần 1 từ 65 đến 89
                    điểm:…...................................................(+10đ)
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="svCitizen"
                      id=""
                      value="10"
                      onChange={handleChangeValue}
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    Điểm lần 1 từ 50 đến 65
                    điểm:….....................................................(+5đ)
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="svCitizen"
                      id=""
                      value="5"
                      onChange={handleChangeValue}
                    />
                  </td>
                </tr> */}

                <tr>
                  <td colSpan="2">
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
                        // console.log("here: ", typeof values.svNoCard);
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
                </tr>

                <tr>
                  <td colSpan="2">
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
                  <td colSpan="2">
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
                </tr>

                <tr>
                  <td colSpan="2">
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
                </tr>

                <tr>
                  <td colSpan="2">
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
                </tr>

                <tr>
                  <td colSpan="2">
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
                  <td colSpan="2">
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
                </tr>

                <tr>
                  <td colSpan="2">
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
                      // onChange={handleChangeInput}
                      readOnly
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
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
                  <td colSpan="2">
                    <p>
                      <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                        1. Phần cộng điểm
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
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
                      // onChange={handleChangeValue}
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
                      // onChange={handleChangeValue}
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
                </tr>

                <tr>
                  <td colSpan="2">
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
                      {/* <?php
                                            for ($i = 0; $i <= 5; $i++) {
                                                if ($svIrresponsibleMonitor == ($i * (-5))) {
                                                    echo '
                                                            <option selected value="' . ($i * (-5)) . '">' . ($i) . '</option>           
                                                        ';
                                                } else {
                                                    echo '
                                                            <option value="' . ($i * (-5)) . '">' . ($i) . '</option>           
                                                        ';
                                                }
                                            }
                                            ?> */}
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
                </tr>

                <tr class="sum_all">
                  <td>
                    <h5 style={{ color: "red", width: "70px" }}>Tổng: </h5>
                  </td>
                  <td>
                    <input type="number" class="sum_mark-student" value={sum} />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-success btn_save bg-[#19d1ca]"
              style={{
                position: "fixed",
                bottom: 0,
                right: 0,
              }}
              onClick={handleSubmit}
            >
              Lưu
            </button>
          </form>
        </div>
      </Box>
    </Box>
  );
};

export default Mark;
