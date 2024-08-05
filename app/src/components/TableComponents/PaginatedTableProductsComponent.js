import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./style.css";

const PaginatedTableProductsComponent = (props) => {
  const products = props.products;
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const offset = currentPage * itemsPerPage;
  const currentProducts = products.slice(offset, offset + itemsPerPage);

  return (
    <>
      <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-900">
        <thead className="align-bottom">
          <tr>
            <th className="px-6 py-4 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              ID
            </th>
            <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              Thông tin chung
            </th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              Tên Sản phẩm
            </th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              giá
            </th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-100">
              thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td className="p-2 px-6 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                <h6 className="mb-0 text-sm leading-normal">#{product.id}</h6>
              </td>
              <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                <div className="flex px-2 py-1">
                  <div>
                    <img
                      src={product.imageProduct}
                      className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-14 w-14 rounded-xl"
                      alt="user1"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="mb-0 text-[14px] leading-tight text-slate-500 flex flex-col">
                      <span className="font-bold text-gray-600">
                        Danh mục:{" "}
                        {props.categories.reduce((item, curr) => {
                          if (curr.id === product.categoriesProduct) {
                            item = curr.nameCategory;
                          }
                          return item;
                        }, "")}
                      </span>
                      <span>Lượt bán: {product.quantitySold}</span>
                      <span>
                        Lượt xem: {product.viewProduct?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-2 align-middle  bg-transparent border-b whitespace-nowrap shadow-transparent text-center">
                <span className="text-center">{product.nameProduct}</span>
              </td>
              <td className="p-2 align-middle  bg-transparent border-b whitespace-nowrap shadow-transparent text-center">
                <span className="text-center">
                  {product.priceProduct.toLocaleString()} đ
                </span>
              </td>
              <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent text-center">
                <span
                  onClick={() => props.hanleTogglePopupUpdate(product.id)}
                  className="cursor-pointer text-blue-500"
                >
                  Edit
                </span>{" "}
                |{" "}
                <span
                  onClick={() => props.handleDeleteProduct(product.id)}
                  className="cursor-pointer text-red-500"
                >
                  Xóa
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Math.ceil(products.length / itemsPerPage) > 1 ? (
        <ReactPaginate
          previousLabel={<ion-icon name="chevron-back-outline"></ion-icon>}
          nextLabel={<ion-icon name="chevron-forward-outline"></ion-icon>}
          breakLabel={"..."}
          pageCount={Math.ceil(products.length / itemsPerPage)}
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

export default PaginatedTableProductsComponent;
