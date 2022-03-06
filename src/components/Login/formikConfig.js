import * as Yup from 'yup';

//set the default values for logging in using email and password
export const defaultValues = {
  email: '',
  password: '',
};

//config settings to require the correct string for the email and password
export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});