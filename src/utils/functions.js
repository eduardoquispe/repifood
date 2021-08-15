export const loadFunction = (callback) => {
  return new Promise((reject, resolve) => {
    callback();
  })
}

export const getErrorFields = (field, formik) => {
  if (formik.touched[field] && formik.errors[field]) {
    return formik.errors[field];
  } else {
    return false;
  }
}

export const getOptionsSelect = ({ labelId, labeltext, labelValue, data = [] }) => {

  let list = [{ text: 'Seleccione', value:'0', key: 0 }];
  data.forEach(dep => {
    list = [...list, {
      key: dep[labelId],
      text: dep[labeltext],
      value: dep[labelValue]
    }];
  })

  return list;

}
