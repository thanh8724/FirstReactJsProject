import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { createCategory } from "../../redux/slices/categoriesSlice";
import validate from "../../assets/js/validation";
import InputReduxFormComponent from "../ReduxFormInputComponents/InputReduxFormComponent";
import TexteraReduxComponent from "../ReduxFormInputComponents/TexteraReduxComponent";

let CreateCategoryForm = (props) => {
  const { nameCategoriesExists, setIsShowPopupAdd, handleSubmit, initialize } =
    props;
  const dispatch = useDispatch();
  const [imageCategory, setImageCategory] = useState(null);
  const [fileIsNull, setFileIsNull] = useState("");

  useEffect(() => {
    if (nameCategoriesExists?.length > 0) {
      initialize({
        nameCategory: "",
        description: "",
        image: "",
      });
    }
  }, [initialize, nameCategoriesExists]);

  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageCategory(file);
    }
  };

  const resetForm = () => {
    initialize({});
  };

  const onSubmit = async (formValues) => {
    if (imageCategory === null) {
      setFileIsNull(true);
    } else {
      const { nameCategory, description } = formValues;
      await dispatch(
        createCategory({
          nameCategory,
          descriptionCategory: description,
          imageCategory,
        })
      );
      setFileIsNull(false);
      setIsShowPopupAdd();
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-auto bg-white flex flex-col gap-3"
    >
      <div className="flex flex-col gap-2">
        <div className="form__groupFile flex items-center gap-3">
          <div className="w-14 h-14 rounded-lg flex-shrink-0 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://cdn4.iconfinder.com/data/icons/picture-sharing-sites/32/No_Image-1024.png"
              alt=""
            />
          </div>
          <input
            onChange={handleOnChangeImage}
            className="w-[126px]"
            name="image"
            type="file"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              resetForm();
            }}
            className="h-[40px] px-7 rounded-lg text-sm text-red-500"
          >
            Xóa
          </button>
        </div>
        {fileIsNull === true ? (
          <span className="text-sm text-[#dc362e] font-semibold">
            Chọn tệp hình ảnh!
          </span>
        ) : null}
      </div>
      <Field
        name="nameCategory"
        label="Tên danh mục"
        type="text"
        component={InputReduxFormComponent}
      />
      <Field
        name="description"
        label="Mô tả danh mục"
        component={TexteraReduxComponent}
      />
      <div className="w-full h-auto flex items-center gap-3">
        <button
          type="submit"
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

CreateCategoryForm = reduxForm({
  form: "CreateCategoryForm",
  validate: (values, props) => validate(values, props.nameCategoriesExists),
})(CreateCategoryForm);

export default CreateCategoryForm;
