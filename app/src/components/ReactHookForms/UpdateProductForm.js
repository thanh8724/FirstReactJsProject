import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import InputDesComponent from "../InputHookComponents/InputDesComponent";
import InputComponent from "../InputHookComponents/InputComponent";
import "./Style.css";
import { updateProduct } from "../../redux/slices/productsSlice";

const UpdateProductForm = ({
  products,
  setIsShowPopupUpdate,
  categories,
  productUpdate,
}) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialProduct = (productUpdate && productUpdate[0]) || {};

  const listNameProduct =
    products && products.map((product) => product.nameProduct);

  const schemaValidation = yup
    .object({
      nameProductUpdate: yup
        .string()
        .required("Vui lòng điền thông tin!")
        .max(255, "Không dài quá 255 kí tự!")
        .test(
          "nameProductUpdate",
          "Sản phẩm đã tồn tại!",
          (value) =>
            value === initialProduct.nameProduct ||
            !listNameProduct.includes(value)
        ),
      descriptionProductUpdate: yup
        .string()
        .required("Vui lòng điền thông tin!")
        .max(255, "Không dài quá 255 kí tự!"),
      priceProductUpdate: yup
        .string()
        .required("Vui lòng điền thông tin!")
        .max(11, "Không dài quá 11 số!"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      nameProductUpdate: initialProduct.nameProduct,
      priceProductUpdate: initialProduct.priceProduct,
      descriptionProductUpdate: initialProduct.descriptionProduct,
      categoryUpdate: initialProduct.categoriesProduct,
    },
  });

  useEffect(() => {
    if (productUpdate) {
      setValue("nameProductUpdate", initialProduct.nameProduct);
      setValue("priceProductUpdate", initialProduct.priceProduct);
      setValue("descriptionProductUpdate", initialProduct.descriptionProduct);
      setValue("categoryUpdate", initialProduct.categoriesProduct);
    }
  }, [productUpdate, setValue, initialProduct]);

  const onSubmit = async (data) => {
    const {
      nameProductUpdate,
      priceProductUpdate,
      descriptionProductUpdate,
      categoryUpdate,
    } = data;
    const dataUpdate = {
      nameProductUpdate,
      priceProductUpdate,
      descriptionProductUpdate,
      categoriesProduct: categoryUpdate,
      id: initialProduct.id,
    };
    await dispatch(updateProduct(dataUpdate));
    setIsShowPopupUpdate();
  };

  const resetForm = (e) => {
    e.preventDefault();
    reset({
      nameProductUpdate: initialProduct.nameProduct,
      priceProductUpdate: initialProduct.priceProduct,
      descriptionProductUpdate: initialProduct.descriptionProduct,
      categoryUpdate: initialProduct.categoriesProduct,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-auto bg-white flex flex-col gap-3"
    >
      <div className="w-[450px] flex flex-col gap-3">
        <InputComponent
          name="nameProductUpdate"
          label="Tên sản phẩm"
          type="text"
          placeholder="Tên sản phẩm..."
          error={errors.nameProductUpdate}
          control={control}
        ></InputComponent>
        <InputComponent
          name="priceProductUpdate"
          label="Giá sản phẩm"
          type="number"
          placeholder="Giá sản phẩm..."
          error={errors.priceProductUpdate}
          control={control}
        ></InputComponent>
        <InputDesComponent
          name="descriptionProductUpdate"
          label="Mô tả sản phẩm"
          placeholder="Mô tả sản phẩm..."
          error={errors.descriptionProductUpdate}
          control={control}
          register={register}
        ></InputDesComponent>
        {/* select options */}
        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-semibold">
            Sản phẩm thuộc danh mục
          </label>
          <Controller
            name="categoryUpdate"
            control={control}
            defaultValue="1"
            render={({ field }) => (
              <select
                {...field}
                id="default"
                className="bg-gray-50 border w-full border-[#182132] text-gray-900 text-sm rounded-lg block p-2.5 cursor-pointer"
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
      <div className=" h-auto flex items-center gap-3">
        <button
          onClick={handleSubmit(onSubmit)}
          className="inline-block w-4/5 px-6 py-3 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer active:shadow-soft-xs hover:scale-102 active:opacity-85 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 border-slate-700 text-slate-700 hover:bg-transparent hover:text-slate-700 hover:shadow-none active:bg-slate-700 active:text-white active:hover:bg-transparent active:hover:text-slate-700 active:hover:shadow-none h-[40px]"
        >
          Cập Nhật Sản Phẩm
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

export default UpdateProductForm;
