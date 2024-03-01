import React from "react";
import "./index.css";
const ViewTable = ({ dataTable, isLop }) => {
  // console.log("data table: ", dataTable);
  const {
    dssv,
    day,
    month,
    year,
    hk,
    tenGV,
    tenLop,
    tenKhoa,
    tenLopTruong,
    tenVaKhoa,
    title,
  } = dataTable;
  console.log("xuong day:", isLop);
  return (
    <div className="bg-white p-2  text-[#000] h-full">
      <div className="p-3 border-shadow h-full overflow-auto">
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
          <h3 className=" italic text-sm">
            Hà Nội, ngày {day} tháng {month} năm {year}
          </h3>
        </div>
        <div className="text-center">
          <h1 className=" font-semibold uppercase">
            {title} - {hk}
          </h1>
        </div>
        <div className="mb-3 text-center">
          <h1 className=" font-semibold uppercase">{tenVaKhoa}</h1>
        </div>
        <div>
          <table class="border-collapse border border-slate-600 w-full text-center text-[14px]">
            <thead>
              <tr className="font-semibold">
                <th class="border border-slate-600 border-solid align-middle">
                  STT
                </th>
                <th class="border border-slate-600 border-solid align-middle w-[10%]">
                  MSSV
                </th>
                <th class="border border-slate-600 border-solid align-middle w-[18%]">
                  Họ và tên
                </th>
                {isLop === 1 && (
                  <th class="border border-slate-600 border-solid align-middle w-[10%]">
                    Lớp
                  </th>
                )}

                <th class="border border-slate-600 border-solid text-center w-[25%] h-full">
                  ĐRL được đánh giá
                  <tr className="w-auto h-full flex">
                    <th class="border border-slate-600 border-solid w-[30%] py-2 border-b-0 border-l-0">
                      (1)
                    </th>
                    <th class="border border-slate-600 border-solid w-[30%] py-2 border-b-0 border-l-0">
                      (2)
                    </th>
                    <th class="border border-slate-600 border-solid w-[30%] py-2 border-b-0 border-l-0">
                      (3)
                    </th>
                    <th class="border border-slate-600 border-solid w-[30%] py-2 border-b-0 border-l-0">
                      (4)
                    </th>
                    <th class="border border-slate-600 border-solid w-[30%] py-2 border-b-0 border-l-0">
                      (5)
                    </th>
                    <th class="border border-slate-600 border-solid text-center w-[30%] border-b-0 border-l-0 border-r-0">
                      Cộng điểm
                    </th>
                  </tr>
                </th>
                <th class="border border-slate-600 border-solid align-middle px-2 py-0 w-[8%]">
                  Hình thức xử lý kỉ luật (6)
                </th>
                <th class="border border-slate-600 border-solid align-middle">
                  Tổng ĐRL
                </th>
                <th class="border border-slate-600 border-solid align-middle w-[10%]">
                  SĐT
                </th>
                <th class="border border-slate-600 border-solid align-middle w-[13%]">
                  Ghi chú
                </th>
              </tr>
            </thead>
            <tbody>
              {dssv?.map((item, idx) => (
                <tr className="text-[15px]" key={idx}>
                  <td class="border border-slate-600 border-solid">
                    {item?.stt}
                  </td>
                  <td class="border border-slate-600 border-solid">
                    {item?.maSv}
                  </td>
                  <td class="border border-slate-600 border-solid ">
                    <span className=" line-clamp-1 text-left px-2 text-base">
                      {item?.name}
                    </span>
                  </td>
                  {isLop === 1 && (
                    <td class="border border-slate-600 border-solid ">
                      <span className=" line-clamp-1 text-left px-2 text-base">
                        {item?.tenLop}
                      </span>
                    </td>
                  )}
                  <td class="border border-slate-600 border-solid border-t-0">
                    <tr className="flex">
                      <td class="border border-slate-600 border-solid  w-[30%] py-1 border-b-0 border-t-0 border-l-0">
                        {item?.sum1}
                      </td>
                      <td class="border border-slate-600 border-solid  w-[30%] py-1 border-b-0 border-t-0 border-l-0">
                        {item?.sum2}
                      </td>
                      <td class="border border-slate-600 border-solid  w-[30%] py-1 border-b-0 border-t-0 border-l-0">
                        {item?.sum3}
                      </td>
                      <td class="border border-slate-600 border-solid  w-[30%] py-1 border-b-0 border-t-0 border-l-0">
                        {item?.sum4}
                      </td>
                      <td class="border border-slate-600 border-solid  w-[30%] py-1 border-b-0 border-t-0 border-l-0">
                        {item?.sum5}
                      </td>
                      <td class="border border-slate-600 border-solid text-center w-[30%] border-b-0 border-t-0 border-l-0 border-r-0">
                        {item?.sum}
                      </td>
                    </tr>
                  </td>
                  <td class="border border-slate-600 border-solid">
                    {item?.ki_luat}
                  </td>
                  <td class="border border-slate-600 border-solid">
                    {item?.sum}
                  </td>
                  <td class="border border-slate-600 border-solid">
                    {item?.phone}
                  </td>
                  <td class="border border-slate-600 border-solid align-middle">
                    <span className=" line-clamp-2 text-left px-2">
                      {item?.gvNote}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="text-[15px]">
                <td class="border border-slate-600 border-solid"></td>
                <td class="border border-slate-600 border-solid"></td>
                <td class="border border-slate-600 border-solid ">
                  <span className=" line-clamp-1 text-left px-2 text-base"></span>
                </td>
                <td class="border border-slate-600 border-solid border-t-0">
                  <tr className="flex">
                    <td class="border border-slate-600 border-solid  w-[30%] py-1 border-b-0 border-t-0 border-l-0"></td>
                    <td class="border border-slate-600 border-solid  w-[30%] py-1 border-b-0 border-t-0 border-l-0"></td>
                    <td class="border border-slate-600 border-solid  w-[30%] py-1 border-b-0 border-t-0 border-l-0"></td>
                    <td class="border border-slate-600 border-solid  w-[30%] py-1 border-b-0 border-t-0 border-l-0"></td>
                    <td class="border border-slate-600 border-solid  w-[30%] py-1 border-b-0 border-t-0 border-l-0"></td>
                    <td class="border border-slate-600 border-solid text-center w-[30%] border-b-0 border-t-0 border-l-0 border-r-0"></td>
                  </tr>
                </td>
                <td class="border border-slate-600 border-solid"></td>
                <td class="border border-slate-600 border-solid"></td>
                <td class="border border-slate-600 border-solid"></td>
                <td class="border border-slate-600 border-solid align-middle">
                  <span className=" line-clamp-2 text-left px-2"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-around">
          <p className="font-bold uppercase">ban chủ nhiệm khoa</p>
          <div>
            <p className="font-bold uppercase mb-[0px]">giáo viên chủ nhiệm</p>
            <p className="text-center capitalize font-semibold">{tenGV}</p>
          </div>
          <div>
            <p className="font-bold uppercase mb-[0px]">Lớp trưởng</p>
            <p className="text-center capitalize font-semibold">
              {tenLopTruong}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTable;
