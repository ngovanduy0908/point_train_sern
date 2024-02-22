import React from "react";
import "./index.css";
const ViewTable = () => {
  return (
    <div className="bg-white p-5 border-shadow">
      <div className="flex justify-around">
        <div className=" uppercase text-center">
          <h2>Bộ giáo dục và đào tạo</h2>
          <h2 className=" font-semibold">Trường đại học mỏ địa chất</h2>
        </div>
        <div className=" font-semibold text-center">
          <h2 className=" uppercase">Cộng hòa xã hội chủ nghĩa Việt Nam</h2>
          <h2>Độc lập - Tự do - Hạnh phúc</h2>
        </div>
      </div>
      <div className=" text-right my-3">
        <h3 className=" italic text-sm">Hà Nội, ngày 22 tháng 2 năm 2024</h3>
      </div>
      <div className="text-center">
        <h1 className=" font-semibold uppercase">
          BẢNG TỔNG HỢP ĐIỂM RÈN LUYỆN - HỌC KÌ 2 NĂM HỌC 2022-2023
        </h1>
      </div>
      <div className="mb-3">
        <h1 className=" font-semibold uppercase">
          LỚP: KHOA HỌC MÁY TÍNH K64A{" "}
          <span className="ml-3 inline-block text-base">
            KHOA: CÔNG NGHỆ THÔNG TIN
          </span>
        </h1>
      </div>
      <div>
        <table class="border-collapse border border-slate-600 w-full text-center text-[14px]">
          <thead>
            <tr className="font-semibold">
              <th class="border border-slate-600 border-solid align-middle">
                STT
              </th>
              <th class="border border-slate-600 border-solid align-middle">
                MSSV
              </th>
              <th class="border border-slate-600 border-solid align-middle w-[15%]">
                Họ và tên
              </th>
              <th class="border border-slate-600 border-solid text-center w-[30%] h-full">
                ĐRL được đánh giá
                <tr className="w-auto h-full">
                  <th class="border border-slate-600 border-solid p-4 border-b-0 border-l-0">
                    (1)
                  </th>
                  <th class="border border-slate-600 border-solid p-4 border-b-0">
                    (2)
                  </th>
                  <th class="border border-slate-600 border-solid p-4 border-b-0">
                    (3)
                  </th>
                  <th class="border border-slate-600 border-solid p-4 border-b-0">
                    (4)
                  </th>
                  <th class="border border-slate-600 border-solid p-4 border-b-0">
                    (5)
                  </th>
                  <th class="border border-slate-600 border-solid p-4 text-center w-full border-b-0 border-r-0">
                    Cộng điểm
                  </th>
                </tr>
              </th>
              <th class="border border-slate-600 border-solid align-middle p-2 w-[8%]">
                Hình thức xử lý kỉ luật (6)
              </th>
              <th class="border border-slate-600 border-solid align-middle">
                Tổng ĐRL
              </th>
              <th class="border border-slate-600 border-solid align-middle w-[10%]">
                SĐT
              </th>
              <th class="border border-slate-600 border-solid align-middle w-[20%]">
                Ghi chú
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-[15px]">
              <td class="border border-slate-600 border-solid">1</td>
              <td class="border border-slate-600 border-solid">1921050130</td>
              <td class="border border-slate-600 border-solid ">
                <span className=" line-clamp-1 text-left px-2 text-base">
                  Nguyễn Mạnh Dũng
                </span>
              </td>
              <td class="border border-slate-600 border-solid border-t-0">
                <tr>
                  <td class="border border-slate-600 border-solid p-4 border-b-0 border-t-0 border-l-0">
                    (1)
                  </td>
                  <td class="border border-slate-600 border-solid p-4 border-b-0 border-t-0">
                    (2)
                  </td>
                  <td class="border border-slate-600 border-solid p-4 border-b-0 border-t-0">
                    (3)
                  </td>
                  <td class="border border-slate-600 border-solid p-4 border-b-0 border-t-0">
                    (4)
                  </td>
                  <td class="border border-slate-600 border-solid p-4 border-b-0 border-t-0">
                    (5)
                  </td>
                  <td class="border border-slate-600 border-solid text-center w-full border-b-0 border-t-0 border-r-0">
                    Cộng điểm
                  </td>
                </tr>
              </td>
              <td class="border border-slate-600 border-solid">0</td>
              <td class="border border-slate-600 border-solid">71</td>
              <td class="border border-slate-600 border-solid">0912452754</td>
              <td class="border border-slate-600 border-solid align-middle">
                <span className=" line-clamp-2 text-left px-2">
                  Xem lại cách chấm điểm Xem lại cách chấm điểm Xem lại cách
                  chấm điểm Xem lại cách chấm điểm Xem lại cách chấm điểm Xem
                  lại cách chấm điểm
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTable;
