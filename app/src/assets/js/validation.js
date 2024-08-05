const validate = (values, nameCategoriesExists) => {
  const errors = {};
  /** name categori */
  if (!values.nameCategory) {
    errors.nameCategory = "Vui lòng điền thông tin!";
  } else if (nameCategoriesExists.includes(values.nameCategory) === true) {
    errors.nameCategory = "Tên danh mục đã tồn tại!";
  } else if (values.nameCategory.length > 255) {
    errors.name = "Không quá 255 kí tự!";
  }

  /** name categoryupdate */

  /** name */
  if (!values.name) {
    errors.name = "Vui lòng điền tên!";
  } else if (values.name.length > 255) {
    errors.name = "Không quá 255 kí tự!";
  }
  /** desc */
  if (!values.description) {
    errors.description = "Vui lòng mô tả!";
  } else if (values.description.length > 255) {
    errors.description = "Không quá 255 kí tự!";
  }
  return errors;
};
export default validate;
