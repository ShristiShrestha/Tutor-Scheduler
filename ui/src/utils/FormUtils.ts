export const parseFormItem = (allFields, fieldName) => {
  const field = allFields.filter((item) => item["name"][0] == fieldName);
  if (field.length > 0) return field[0].value;
  return null;
};
