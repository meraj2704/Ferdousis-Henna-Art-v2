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
    image: yup.mixed().required("Image is required"),
  });