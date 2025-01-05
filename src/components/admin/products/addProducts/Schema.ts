import * as yup from "yup";
export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.number().required("Price is required"),
  discountPercentage: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .min(0, "Discount percentage can not be negative")
    .max(100, "Discount percentage can not exceed 100"),
  discountedPrice: yup.number(),
  quantity: yup.number().nullable(),
  description: yup.string().required("Description is required"),
  active: yup.boolean(),
  image: yup
    .mixed()
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
});
