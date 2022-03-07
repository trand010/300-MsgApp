import { ErrorMessage, Field } from 'formik';

//This code is boilerplate to allow cleaner code for formik used by app, chat, and login
//passes in name, label, type 
const FormField = ({ name, label, type = 'text' }) => (
  <label>
    {label}
    <Field name={name} type={type} />
    <ErrorMessage className="error" component="div" name={name} />
  </label>
);

export default FormField