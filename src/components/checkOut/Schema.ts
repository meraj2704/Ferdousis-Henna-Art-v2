import * as yup from 'yup';

export const checkoutSchema = yup.object().shape({
    fullName: yup.string().required('Full Name is required'),
    phone: yup
        .string()
        .matches(/^(?:\+?88)?01[3-9]\d{8}$/, 'Phone number must be a valid Bangladeshi number with 11 digits')
        .required('Phone number is required'),
    state: yup.string().required('Division is required'),
    district: yup.string().required('District is required'),
    upazila: yup.string().required('Upazila is required'),
    address: yup.string().required('Courier office address is required'),
    addressDetails: yup.string().required('Address details are required'),
});
