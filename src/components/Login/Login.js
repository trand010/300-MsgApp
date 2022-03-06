import { useState } from 'react';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import FormField from '../FormField/formField';
import { validationSchema, defaultValues } from './formikConfig';

//login form will only require email and password
const Login = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const login = ({ email, password }, { setSubmitting }) => console.log('Logging In: ', email, password);

  //uses formik to create login form using the default values from the config file
  return (
    <div className="auth-form">
      <h1>Login</h1>
      <Formik
        onSubmit={login}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name="email" label="Email" type="email" />
            <FormField name="password" label="Password" type="password" />

            {/*create an onclick div to go to the regisration page to allow users to create an account*/}
            <div className="auth-link-container">
              New User?{' '}
              <span
                className="auth-link"
                onClick={() => history.push('signup')}
              >
                Sign Up Here
              </span>
            </div>

            {/*disables the submit button if there is an error filling the forms*/}
            <button type="submit" disabled={!isValid || isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>

      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};

export default Login