import * as yup from "yup";

export const taskSchema = yup.object().shape({
  title: yup.string().required("title is required"),
  description: yup.string().required("Description is required"),
  date: yup.string().required("Date is required"),
});
