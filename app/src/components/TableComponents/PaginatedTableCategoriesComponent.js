import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./style.css";

const PaginatedTableCategoriesComponent = (probs) => {
  const categories = probs.categories;
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const offset = currentPage * itemsPerPage;
  const currentCategories = categories.slice(offset, offset + itemsPerPage);
  if (categories.length === 0) return null;
  return (
    <>
      <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-900">
        <thead className="align-bottom">
          <tr>
            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              ID
            </th>
            <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              Thông tin chung
            </th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              Tên danh mục
            </th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              Mô tả
            </th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {currentCategories &&
            currentCategories.map((category) => (
              <tr key={category.id}>
                <td className="p-2 px-6 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                  <h6 className="mb-0 text-sm leading-normal">
                    #{category.id}
                  </h6>
                </td>
                <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                  <div className="flex px-2 py-1">
                    <div>
                      <img
                        src={category.imageCategory}
                        className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-14 w-14 rounded-xl"
                        alt="user1"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h6 className="mb-0 text-[15px] leading-normal">
                        {category.nameCategory}
                      </h6>
                      <p className="mb-0 text-[14px] leading-tight text-slate-500">
                        Hiện có{" "}
                        {probs.products.reduce((quantity, currentProduct) => {
                          if (
                            currentProduct.categoriesProduct === category.id
                          ) {
                            return quantity + 1;
                          }
                          return quantity;
                        }, 0)}{" "}
                        sản phẩm
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent text-center">
                  <span className="text-center">{category.nameCategory}</span>
                </td>
                <td className="p-2 leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                  <span>
                    {category.descriptionCategory || "Chưa có mô tả."}
                  </span>
                </td>
                <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent text-center">
                  <span
                    onClick={() => probs.hanleTogglePopupUpdate(category.id)}
                    className="cursor-pointer text-blue-500"
                  >
                    Edit
                  </span>{" "}
                  /{" "}
                  <span
                    onClick={() =>
                      probs.handleDelete(category.id, category.imageCategory)
                    }
                    className="cursor-pointer text-red-500"
                  >
                    Xóa
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {Math.ceil(categories.length / itemsPerPage) > 1 ? (
        <ReactPaginate
          previousLabel={<ion-icon name="chevron-back-outline"></ion-icon>}
          nextLabel={<ion-icon name="chevron-forward-outline"></ion-icon>}
          breakLabel={"..."}
          pageCount={Math.ceil(categories.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      ) : null}
    </>
  );
};

export default PaginatedTableCategoriesComponent;
