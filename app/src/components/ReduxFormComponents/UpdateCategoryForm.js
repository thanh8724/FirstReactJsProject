import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  createCategory,
  updateCategory,
} from "../../redux/slices/categoriesSlice";
import InputReduxFormComponent from "../ReduxFormInputComponents/InputReduxFormComponent";
import TexteraReduxComponent from "../ReduxFormInputComponents/TexteraReduxComponent";

// Hàm validate cho trường nameCategoryUpdate
const validateCategoryName = (value, names) => {
  const errors = [];
  if (!value || value.length === 0) {
    errors.push("Vui lòng điền thông tin!");
  }
  if (value && value.length > 255) {
    errors.push("Độ dài tối đa 255 ký tự.");
  }
  if (names.includes(value)) {
    errors.push("Tên danh mục đã tồn tại.");
  }
  return errors.length > 0 ? errors : undefined;
};

// Hàm validate cho toàn bộ form
const validate = (values, props) => {
  const errors = {};
  const { nameCategoriesExistsUpdate } = props;
  errors.nameCategoryUpdate = validateCategoryName(
    values.nameCategoryUpdate,
    nameCategoriesExistsUpdate
  );
  return errors;
};

let UpdateCategoryForm = (props) => {
  const {
    nameCategoriesExistsUpdate,
    setIsShowPopupUpdate,
    categorytUpdate,
    handleSubmit,
    initialize,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (nameCategoriesExistsUpdate?.length > 0 && categorytUpdate.length > 0) {
      initialize({
        nameCategoryUpdate: categorytUpdate[0]?.nameCategory,
        description: categorytUpdate[0]?.descriptionCategory,
      });
    }
  }, [initialize, nameCategoriesExistsUpdate, categorytUpdate]);

  const resetForm = () => {
    initialize({});
  };

  const onSubmit = async (formValues) => {
    await dispatch(
      updateCategory({
        nameCategoryUpdate: formValues.nameCategoryUpdate,
        description: formValues.description,
        id: categorytUpdate[0].id,
      })
    );
    initialize({});
    setIsShowPopupUpdate();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-auto bg-white flex flex-col gap-3"
    >
      <div className="flex flex-col gap-2"></div>
      <Field
        name="nameCategoryUpdate"
        label="Tên danh mục"
        type="text"
        component={InputReduxFormComponent}
        validate={(value) =>
          validateCategoryName(value, nameCategoriesExistsUpdate)
        }
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
          Cập Nhật Danh Mục
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            resetForm();
          }}
          className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer leading-pro text-xs ease-soft-in hover:shadow-soft-xs hover:scale-102 active:opacity-85 tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 w-2/4"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

UpdateCategoryForm = reduxForm({
  form: "UpdateCategoryForm",
  validate: (values, props) => validate(values, props),
})(UpdateCategoryForm);

export default UpdateCategoryForm;
