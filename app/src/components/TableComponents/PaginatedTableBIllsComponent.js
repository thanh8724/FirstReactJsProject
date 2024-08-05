import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./style.css";

const PaginatedTableBIllsComponent = ({
  bills,
  productBill,
  hanleTogglePopupUpdate,
}) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const offset = currentPage * itemsPerPage;
  const currentBIlls = bills?.slice(offset, offset + itemsPerPage);
  return (
    <>
      <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-900">
        <thead className="align-bottom">
          <tr>
            <th className="px-6 py-4 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              ID
            </th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              Tên người nhận
            </th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              địa chỉ
            </th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              thời gian
            </th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              giá
            </th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              trạng thái
            </th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {currentBIlls &&
            currentBIlls?.map((bill) => (
              <tr key={bill.id}>
                <td className="p-2 px-6 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                  <h6 className="mb-0 text-sm leading-normal py-3">
                    #{bill.id}
                  </h6>
                </td>
                <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparen text-center">
                  <span className="text-center">{bill.receiver}</span>
                </td>
                <td className="p-2 align-middle  bg-transparent border-b whitespace-nowrap shadow-transparent text-center">
                  <span className="text-center">{bill.address}</span>
                </td>
                <td className="p-2 align-middle  bg-transparent border-b whitespace-nowrap shadow-transparent text-center">
                  <span className="text-center">
                    {bill.timeOrder.split("T")[0]}
                  </span>
                </td>
                <td className="p-2 align-middle  bg-transparent border-b whitespace-nowrap shadow-transparent text-center">
                  <span className="text-center">
                    {bill.totalAmount.toLocaleString()} đ
                  </span>
                </td>
                <td className="p-2 align-middle  bg-transparent border-b whitespace-nowrap shadow-transparent text-center">
                  <span
                    className={`text-center ${
                      Number(bill.status) === 1
                        ? "text-orange-500"
                        : Number(bill.status) === 2
                        ? "text-green-500"
                        : Number(bill.status) === 3
                        ? ""
                        : ""
                    }`}
                  >
                    {Number(bill.status) === 1
                      ? "Chờ xác nhận"
                      : Number(bill.status) === 2
                      ? "Đang giao"
                      : Number(bill.status) === 3
                      ? "Đã giao"
                      : ""}
                  </span>
                </td>
                <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent text-center">
                  <span
                    onClick={() => hanleTogglePopupUpdate(bill.id)}
                    className="cursor-pointer text-blue-500"
                  >
                    Cập nhật
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {Math.ceil(bills?.length / itemsPerPage) > 1 ? (
        <ReactPaginate
          previousLabel={<ion-icon name="chevron-back-outline"></ion-icon>}
          nextLabel={<ion-icon name="chevron-forward-outline"></ion-icon>}
          breakLabel={"..."}
          pageCount={Math.ceil(bills?.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default PaginatedTableBIllsComponent;
