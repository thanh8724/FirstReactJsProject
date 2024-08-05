import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PaginatedTableProductsComponent from "../../components/TableComponents/PaginatedTableProductsComponent";
import { deleteProduct } from "../../redux/slices/productsSlice";
import CreateProductForm from "../../components/ReactHookForms/CreateProductForm";
import UpdateProductForm from "../../components/ReactHookForms/UpdateProductForm";

const Products = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);
  const [isShowPopupAdd, setIsShowPopupAdd] = useState(false);
  const [isShowPopupUpdate, setIsShowPopupUpdate] = useState(false);
  const productUpdate = useRef(null);
  const [filterProducts, setFilterProducts] = useState(products);
  const [keyWordSearch, setKeyWordSearch] = useState("");
  useEffect(() => {
    setFilterProducts(products);
  }, [products]);
  const handleSearch = (event) => {
    setKeyWordSearch(event.target.value);
    const filtered = products.filter((product) =>
      product.nameProduct
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setFilterProducts(filtered);
  };
  const hanleTogglePopupAdd = (e) => {
    isShowPopupAdd ? setIsShowPopupAdd(false) : setIsShowPopupAdd(true);
  };
  const hanleTogglePopupUpdate = (id) => {
    isShowPopupUpdate
      ? setIsShowPopupUpdate(false)
      : setIsShowPopupUpdate(true);
    productUpdate.current = products.filter((product) => product.id === id);
  };
  const handleDeleteProduct = async (idProduct) => {
    await dispatch(deleteProduct(idProduct));
  };
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto flex flex-col gap-4">
        <div className="w-full h-auto flex justify-between items-center gap-3">
          <div className="text-xl font-bold pt-2 text">
            <h6>Danh sách sản phẩm</h6>
          </div>
          <div className="flex gap-3 items-center">
            <div className="relative flex flex-wrap items-stretch w-[250px] transition-all rounded-lg ease-soft h-[42px]">
              <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                <ion-icon name="search-outline"></ion-icon>
              </span>
              <input
                type="text"
                className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow pl-7"
                placeholder="Type here..."
                fdprocessedid="0v423v"
                value={keyWordSearch}
                onChange={handleSearch}
              />
            </div>
            <button
              onClick={hanleTogglePopupAdd}
              white-style-btn=""
              className="inline-block w-[150px] px-4 py-3 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg cursor-pointer xl-max:cursor-not-allowed xl-max:opacity-65 xl-max:pointer-events-none xl-max:bg-gradient-to-tl xl-max:from-purple-700 xl-max:to-pink-500 xl-max:text-white xl-max:border-0 hover:scale-102 hover:shadow-soft-xs active:opacity-85 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 border-fuchsia-500 bg-none text-fuchsia-500 hover:border-fuchsia-500"
              data-class="bg-white"
              fdprocessedid="0qszhi"
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 ps">
                  <PaginatedTableProductsComponent
                    products={filterProducts}
                    categories={categories}
                    handleDeleteProduct={handleDeleteProduct}
                    hanleTogglePopupUpdate={hanleTogglePopupUpdate}
                  ></PaginatedTableProductsComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* popup add */}
      <div
        className={`w-screen h-screen fixed top-0 left-0 z-30 popupContainer flex justify-center items-center ${
          isShowPopupAdd ? "show-popup" : ""
        }`}
        onClick={hanleTogglePopupAdd}
      >
        <div
          className="w-auto min-h-1/4 rounded-lg bg-white p-4 flex flex-col gap-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">Thêm Sản Phẩm</h1>
            <span
              className="cursor-pointer text-[25px] text-red-500"
              onClick={hanleTogglePopupAdd}
            >
              <ion-icon name="close-outline"></ion-icon>
            </span>
          </div>
          <div className="w-full">
            <CreateProductForm
              products={products}
              categories={categories}
              setIsShowPopupAdd={setIsShowPopupAdd}
            ></CreateProductForm>
          </div>
        </div>
      </div>
      {/* popup update */}
      <div
        className={`w-screen h-screen fixed top-0 left-0 z-30 popupContainer flex justify-center items-center ${
          isShowPopupUpdate ? "show-popup" : ""
        }`}
        onClick={hanleTogglePopupUpdate}
      >
        <div
          className="w-auto min-h-1/4 rounded-lg bg-white p-4 flex flex-col gap-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">Cập Nhật Sản Phẩm</h1>
            <span
              className="cursor-pointer text-[25px] text-red-500"
              onClick={hanleTogglePopupUpdate}
            >
              <ion-icon name="close-outline"></ion-icon>
            </span>
          </div>
          <div className="w-full">
            <UpdateProductForm
              products={products}
              productUpdate={productUpdate.current}
              categories={categories}
              setIsShowPopupUpdate={setIsShowPopupUpdate}
            ></UpdateProductForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
