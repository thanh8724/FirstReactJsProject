import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/slices/productsSlice";
import InputDesComponent from "../InputHookComponents/InputDesComponent";
import InputComponent from "../InputHookComponents/InputComponent";
import "./Style.css";

const CreateProductForm = ({ products, setIsShowPopupAdd, categories }) => {
  const dispatch = useDispatch();
  const listNameProduct =
    products && products?.map((product) => product.nameProduct);
  const schemaValidation = yup
    .object({
      nameProduct: yup
        .string()
        .required("Vui lòng điền thông tin!")
        .max(255, "Không dài quá 255 kí tự!")
        .test(
          "nameProduct",
          "Sản phẩm đã tồn tại!",
          (value) => !listNameProduct.includes(value)
        ),
      descriptionProduct: yup
        .string()
        .required("Vui lòng điền thông tin!")
        .max(255, "Không dài quá 255 kí tự!"),
      priceProduct: yup
        .string()
        .required("Vui lòng điền thông tin!")
        .max(11, "Không dài quá 11 số!"),
    })
    .required();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm({ resolver: yupResolver(schemaValidation) });
  const onSubmit = async (data) => {
    if (data.imageProduct.length === 0) {
      setError("imageProduct", {
        type: "manual",
        message: "Cẩn phải thêm ảnh!",
      });
    }
    if (
      data.imageDetailProduct.length === 0 ||
      data.imageDetailProduct.length > 4
    ) {
      setError("imageDetailProduct", {
        type: "manual",
        message: "Số lượng ảnh từ 1-4!",
      });
    } else {
      if (isValid) {
        dispatch(createProduct(data));
        reset({ imageProduct: "", nameProduct: "", descriptionProduct: "" });
        setIsShowPopupAdd(false);
      }
    }
  };
  const resetForm = (e) => {
    e.preventDefault();
    reset({ imageProduct: "", nameProduct: "", descriptionProduct: "" });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-auto bg-white flex flex-col gap-3"
    >
      <div className="flex gap-5">
        {/* left */}
        <div className="w-[350px] flex flex-col gap-3">
          <InputComponent
            name="nameProduct"
            label="Tên sản phẩm"
            type="text"
            placeholder="Tên sản phẩm..."
            error={errors.nameProduct}
            control={control}
          ></InputComponent>
          <InputComponent
            name="priceProduct"
            label="Giá sản phẩm"
            type="number"
            placeholder="Giá sản phẩm..."
            error={errors.priceProduct}
            control={control}
          ></InputComponent>
          <InputDesComponent
            name="descriptionProduct"
            label="Mô tả sản phẩm"
            placeholder="Mô tả sản phẩm..."
            error={errors.descriptionProduct}
            control={control}
            register={register}
          ></InputDesComponent>
        </div>
        {/* right */}
        <div className="flex flex-col gap-3 w-[210px]">
          {/* input file start */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-semibold">Ảnh sản phẩm</label>
            <div className="form__groupFile flex items-center gap-3 h-[45.6px]">
              <div className="w-[45.6px] h-[45.6px] rounded-lg flex-shrink-0 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://cdn4.iconfinder.com/data/icons/picture-sharing-sites/32/No_Image-1024.png"
                  alt=""
                />
              </div>
              <input
                className="!w-[152px] h-[45.6px]"
                type="file"
                {...register("imageProduct", {
                  onChange: (e) => {
                    if (e.target.files.length <= 4) {
                      clearErrors("imageProduct");
                    }
                  },
                })}
              />
            </div>
            {errors.imageProduct && (
              <span className="text-sm text-[#dc362e] font-semibold">
                {errors.imageProduct.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-semibold">
              Ảnh chi tiết sản phẩm
            </label>
            <div className="form__groupFile flex items-center gap-3 h-[45.6px]">
              <div className="w-[45.6px] h-[45.6px] rounded-lg flex-shrink-0 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://cdn4.iconfinder.com/data/icons/picture-sharing-sites/32/No_Image-1024.png"
                  alt=""
                />
              </div>
              <input
                className="!w-[152px] h-[45.6px]"
                type="file"
                multiple
                {...register("imageDetailProduct", {
                  onChange: (e) => {
                    if (e.target.files.length <= 4) {
                      clearErrors("imageDetailProduct");
                    }
                  },
                })}
              />
            </div>
            {errors.imageDetailProduct && (
              <span className="text-sm text-[#dc362e] font-semibold">
                {errors.imageDetailProduct.message}
              </span>
            )}
          </div>
          {/* input file end */}
          {/* select options */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-semibold">
              Sản phẩm thuộc danh mục
            </label>
            <Controller
              name="category"
              control={control}
              defaultValue="1"
              render={({ field }) => (
                <select
                  {...field}
                  id="default"
                  className="bg-gray-50 border border-[#182132] text-gray-900 mb-6 text-sm rounded-lg block w-full p-2.5 cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nameCategory}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex items-center gap-3">
        <button
          onClick={handleSubmit(onSubmit)}
          className="inline-block w-[490px] px-6 py-3 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer active:shadow-soft-xs hover:scale-102 active:opacity-85 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 border-slate-700 text-slate-700 hover:bg-transparent hover:text-slate-700 hover:shadow-none active:bg-slate-700 active:text-white active:hover:bg-transparent active:hover:text-slate-700 active:hover:shadow-none h-[40px]"
        >
          Thêm Sản Phẩm Mới
        </button>
        <button
          onClick={resetForm}
          className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer leading-pro text-xs ease-soft-in hover:shadow-soft-xs hover:scale-102 active:opacity-85 tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 w-2/4"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default CreateProductForm;
