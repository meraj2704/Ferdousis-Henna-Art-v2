import * as yup from "yup";
export const schema = yup.object().shape({
  type: yup
    .string()
    .oneOf(["poster", "manual"], "Type must be either 'poster' or 'manual'")
    .required("Please select a type"),
  title: yup.string().when("type", ([val]) => {
    if (val === "manual") return yup.string().required("Title is required");
    else return yup.string().notRequired();
  }),
  description: yup.string().when("type", ([val]) => {
    if (val === "manual")
      return yup.string().required("Description is required");
    else return yup.string().notRequired();
  }),
  buttonName: yup.string().required("Button name is required"),
  link: yup.string().required("Link is required"),
  image: yup
    .mixed()
    .nullable()
    .required("Image is required")
    .test("fileSize", "File is too large", (value: any) => {
      console.log("value of image is", value);
      return value && value[0] && value[0].size <= 5000000;
    })
    .test("fileType", "Unsupported File Format", (value: any) => {
      return (
        value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type)
      );
    }),
  active: yup.boolean().required("Please select an active status"),
});

export const editSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(["poster", "manual"], "Type must be either 'poster' or 'manual'")
    .required("Please select a type"),
  title: yup.string().when("type", ([val]) => {
    if (val === "manual") return yup.string().required("Title is required");
    else return yup.string().notRequired();
  }),
  description: yup.string().when("type", ([val]) => {
    if (val === "manual")
      return yup.string().required("Description is required");
    else return yup.string().notRequired();
  }),
  buttonName: yup.string().required("Button name is required"),
  link: yup.string().required("Link is required"),
  image: yup.mixed().required("Image is required"),
  active: yup.boolean().required("Please select an active status"),
});
