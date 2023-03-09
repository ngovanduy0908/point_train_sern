import { Box } from '@mui/material';
import axios from 'axios';
import { getUserInLocalStorage } from 'context/getCurrentUser';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

import '../../assets/css/grid.css';
import './phieu.css';
const Mark = () => {
  const currentUser = getUserInLocalStorage();
  const { pathname } = useLocation();
  const maHK = pathname.split('/')[2];
  //   console.log(maHK);
  const [studentData, setStudentData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getSv();
  }, []);

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

      //   console.log();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //   console.log(studentData);
  return (
    <Box m="1.5rem 2.5rem">
      <Box
        sx={{
          padding: '25px',
          border: '1px solid #ccc',
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
              <p style={{ fontWeight: 'bold' }}>
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
          <form>
            <table className="table table-bordered">
              {/* header table */}
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: 'center',
                      width: '80%',
                      padding: '0px',
                      lineHeight: '83.5px',
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
                  <td colspan="2">
                    <p>
                      <span style={{ fontWeight: 'bold' }}>
                        I. <u>Đánh giá về ý thức và kết quả học tập</u>
                      </span>{' '}
                      <span style={{ fontStyle: 'italic' }}>
                        (Tính điểm thi lần 1. Tổng điểm: 0 - 30 điểm)
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                        1. Phần cộng điểm
                      </span>{' '}
                      (tổng điểm có thể chấm quá 30 khi SV đạt giải NCKH, thi
                      Olimpic cấp Bộ hoặc cấp Quốc gia)
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colspan="2">a). Kết quả học tập:</td>
                </tr>

                <tr>
                  <td width="70%">
                    - Điểm TBCHT ≥ 3,6:
                    ..............................................................……….......(+20đ)
                  </td>
                  <td>
                    <input type="radio" name="svDiemTBHK" id="hi" value="20" />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Điểm TBCHT từ 3,2 đến 3,59:
                    ............................................................(+18)
                  </td>
                  <td>
                    <input type="radio" name="svDiemTBHK" id="ao" value="18" />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Điểm TBCHT từ 2,5 đến 3,19:
                    ...........................................................(+16đ)
                  </td>
                  <td>
                    <input type="radio" name="svDiemTBHK" id="" value="16" />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Điểm TBCHT từ 2,0 đến 2,49:
                    ..........................................................(+12đ)
                  </td>
                  <td>
                    <input type="radio" name="svDiemTBHK" id="" value="12" />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Điểm TBCHT từ 1,5 đến 1,99:
                    ..........................................................(+10đ)
                  </td>
                  <td>
                    <input type="radio" name="svDiemTBHK" id="" value="10" />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Điểm TBCHT từ 1,0 đến 1,49:
                    ............................................................(+8đ)
                  </td>
                  <td>
                    <input type="radio" name="svDiemTBHK" id="" value="8" />
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
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
                      // value=""
                      min="0"
                      max="8"
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
                      // value="<?= $svNCKH2 ?>"
                      min="0"
                      max="6"
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
                      value="<?= $svNCKH3 ?>"
                      min="0"
                      max="6"
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
                      value="<?= $svOlympic1 ?>"
                      min="0"
                      max="10"
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
                      value="<?= $svOlympic2 ?>"
                      min="0"
                      max="6"
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
                      value="<?= $svOlympic3 ?>"
                      min="0"
                      max="5"
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
                      value="<?= $svOlympic4 ?>"
                      min="0"
                      max="2"
                    />
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
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
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    - Đi học đầy đủ, đúng giờ:
                    ………………….......................…………....(+2đ)
                  </td>
                  <td>
                    <input type="checkbox" name="svOnTime" id="" />
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span
                        style={{
                          fontWeight: 'bold',
                          fontStyle: 'italic',
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
                      value="<?= $svAbandon ?>"
                      min="-15"
                      max="0"
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    b). Không đi học, đi không đúng giờ:
                    .………………...………......(-2đ/buổi)
                  </td>
                  <td>
                    <select name="svUnTrueTime" id="svUnTrueTime">
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index}>
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
                      className="sum_one sum_item"
                      value="0"
                    />
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        II.
                        <u>
                          Đánh giá về ý thức và kết quả chấp hành nội quy, quy
                          chế của Trường
                        </u>
                      </span>{' '}
                      <span style={{ fontStyle: 'italic' }}>
                        (Tổng điểm: 0 - 25 điểm)
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span
                        style={{
                          fontWeight: 'bold',
                          fontStyle: 'italic',
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
                    />
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    b). Kết quả học tập Tuần sinh hoạt công dân sinh viên
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    Điểm lần 1 ≥
                    90:………………...........................................................(+15đ)
                  </td>
                  <td>
                    <input type="radio" name="svCitizen" id="" value="15" />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    Điểm lần 1 từ 65 đến 89
                    điểm:…...................................................(+10đ)
                  </td>
                  <td>
                    <input type="radio" name="svCitizen" id="" value="10" />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    Điểm lần 1 từ 50 đến 65
                    điểm:….....................................................(+5đ)
                  </td>
                  <td>
                    <input type="radio" name="svCitizen" id="" value="5" />
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span
                        style={{
                          fontWeight: 'bold',
                          fontStyle: 'italic',
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
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    b). Không đeo thẻ sinh viên trong khuôn viên
                    Trường:..............…....(-5đ/lần)
                  </td>
                  <td>
                    <select name="svNoCard" id="svNoCard">
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index}>
                          {index}
                        </option>
                      ))}
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
                    <select name="svNoAtivities" id="svNoAtivities">
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index}>
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
                      id=""
                      value="-10"
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
                      name=""
                      id=""
                      class="sum_two sum_item"
                      value=""
                    />
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span style={{ fontWeight: 'bold' }}>
                        III.
                        <u>
                          {' '}
                          Đánh giá về ý thức và kết quả tham gia các hoạt động
                          chính trị, xã hội, văn hoá, văn nghệ, thể thao, phòng
                          chống các tệ nạn xã hội
                        </u>
                      </span>{' '}
                      <span style={{ fontStyle: 'italic' }}>
                        (Tổng điểm: 0 - 20 điểm)
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
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
                    />
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
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
                      value="<?= $svAchievementSchool ?>"
                      min="0"
                      max="3"
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
                      value="<?= $svAchievementCity ?>"
                      min="0"
                      max="5"
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    c). Tham gia các hoạt động tư vấn tuyển sinh (có xác nhận
                    của phòng QHCC&DN):…………………………………………( +2đ/lần)
                  </td>
                  <td>
                    <select name="svAdvise" id="svAdvise">
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
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
                    <select name="svIrresponsible" id="svIrresponsible">
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index}>
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
                    <select name="svNoCultural" id="svNoCultural">
                      {Array.from({ length: 6 }, (_, index) => (
                        <option key={index} value={index}>
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
                    <input type="number" class="sum_three sum_item" value="0" />
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span style={{ fontWeight: 'bold' }}>
                        IV.
                        <u>
                          {' '}
                          Đánh giá về phẩm chất công dân và quan hệ công đồng{' '}
                        </u>
                      </span>{' '}
                      <span style={{ fontStyle: 'italic' }}>
                        (Tổng điểm: 0 - 15 điểm)
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
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
                    />
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
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
                    <input type="checkbox" name="svWarn" id="" value="-5" />
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
                    />
                  </td>
                </tr>

                <tr>
                  <td width="70%">
                    <h5>Cộng mục IV</h5>
                  </td>
                  <td>
                    <input type="number" class="sum_four sum_item" value="0" />
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span style={{ fontWeight: 'bold' }}>
                        V.
                        <u>
                          Đánh giá về ý thức và kết quả tham gia phụ trách lớp,
                          các đoàn thể tổ chức khác trong Trường
                        </u>
                      </span>{' '}
                      <span style={{ fontStyle: 'italic' }}>
                        (Tổng điểm: 0 - 10 điểm)
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                        1. Phần cộng điểm
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
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
                      value="7"
                      // <?php
                      // echo ($svMonitor == '7') ? "checked" :  "" ;
                      // echo (in_array($role_name, $arr_level_one)) ? "checked" : "" ;
                      // if (in_array($row['role_name'], $arr_level_two))
                      //     {
                      //     echo "found";
                      //     }
                      // else
                      //     {
                      //     echo "not found";
                      //     }
                      // ?>
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
                      readonly
                      // <?php
                      //     // echo ($svMonitor == '5') ? "checked" :  "" ;
                      //     echo (in_array($role_name, $arr_level_two)) ? "checked" : "" ;
                      // ?>
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    b). Được các cấp khen thưởng:
                    ....….................….................………......(+3đ)
                  </td>
                  <td>
                    <input type="checkbox" name="svBonus" id="" value="3" />
                  </td>
                </tr>

                <tr>
                  <td colspan="2">
                    <p>
                      <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
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
                        <option key={index} value={index}>
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
                    <input type="number" class="sum_five sum_item" value="0" />
                  </td>
                </tr>

                <tr class="sum_all">
                  <td>
                    <h5 style={{ color: 'red', width: '70px' }}>Tổng: </h5>
                  </td>
                  <td>
                    <input type="number" class="sum_mark-student" value="0" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </Box>
    </Box>
  );
};

export default Mark;
