import * as Yup from 'yup';

//set default values for email, username, password
export const defaultValues = {
  email: '',
  password: '',
  userName: '',
  verifyPassword: '',
};

//use .email to require user to type in a verified email
//use .min to require a minimum of 5 characters
//verifyPassword uses oneOf to check for match
//username requires no spaces and must be 3 characters
export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required').min(5, 'Must be at least 5 characters'),
  verifyPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords do not match'),
  userName: Yup.string().required('Required').matches(/^\S*$/, 'No spaces').min(3, 'Must be at least 3 characters'),
});