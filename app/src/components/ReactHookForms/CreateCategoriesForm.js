import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/slices/categoriesSlice";
import InputDesComponent from "../InputHookComponents/InputDesComponent";
import InputComponent from "../InputHookComponents/InputComponent";
import "./Style.css";

const CreateCategoriesForm = ({ categories, setIsShowPopupAdd }) => {
  const dispatch = useDispatch();
  const listNameCategories =
    categories && categories?.map((category) => category.nameCategory);
  const schemaValidation = yup
    .object({
      nameCategory: yup
        .string()
        .required("Vui lòng điền thông tin!")
        .max(255, "Không dài quá 255 kí tự!")
        .test(
          "nameCategory",
          "Danh mục đã tồn tại!",
          (value) => !listNameCategories.includes(value)
        ),
      descriptionCategory: yup
        .string()
        .required("Vui lòng điền thông tin!")
        .max(255, "Không dài quá 255 kí tự!"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm({ resolver: yupResolver(schemaValidation) });
  const onSubmit = async (data) => {
    if (isValid) {
      await dispatch(createCategory(data));
      reset({ imageCategory: "", nameCategory: "", descriptionCategory: "" });
      setIsShowPopupAdd(false);
    }
  };
  const resetForm = (e) => {
    e.preventDefault();
    reset({ imageCategory: "", nameCategory: "", descriptionCategory: "" });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-auto bg-white flex flex-col gap-3"
    >
      <div className="form__groupFile flex items-center gap-3">
        <div className="w-14 h-14 rounded-lg flex-shrink-0 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://cdn4.iconfinder.com/data/icons/picture-sharing-sites/32/No_Image-1024.png"
            alt=""
          />
        </div>
        <input
          className="w-[126px]"
          type="file"
          {...register("imageCategory")}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            reset({ imageCategory: "" });
          }}
          className="h-[40px] px-7 rounded-lg text-sm text-red-500"
        >
          Xóa
        </button>
      </div>
      <InputComponent
        name="nameCategory"
        label="Tên danh mục"
        type="text"
        placeholder="Tên danh mục..."
        error={errors.nameCategory}
        control={control}
      ></InputComponent>
      <InputDesComponent
        name="descriptionCategory"
        label="Mô tả danh mục"
        placeholder="Mô tả danh mục..."
        error={errors.descriptionCategory}
        register={register}
      ></InputDesComponent>
      <div className="w-full h-auto flex items-center gap-3">
        <button
          onClick={handleSubmit(onSubmit)}
          className="inline-block w-full px-6 py-3 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer active:shadow-soft-xs hover:scale-102 active:opacity-85 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 border-slate-700 text-slate-700 hover:bg-transparent hover:text-slate-700 hover:shadow-none active:bg-slate-700 active:text-white active:hover:bg-transparent active:hover:text-slate-700 active:hover:shadow-none"
        >
          Thêm Danh Mục
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

export default CreateCategoriesForm;
