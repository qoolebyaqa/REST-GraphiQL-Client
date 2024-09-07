
import * as yup from 'yup';

export const formSchema = yup.object().shape({
  login: yup
    .string().required().email(),
  password: yup
    .string()
    .required()
    .min(8, 'Minimum 8 symbols')
    .matches(/(?=.*\d)/, 'Password requires a number')
    .matches(/(?=.*[A-Za-zА-Яа-яЁё])/, 'Password requires a letter')
    .matches(/(?=.*[\W_])/, 'Password requires a symbol')
});