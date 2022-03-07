import { useState } from 'react';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import FormField from '../formField';
import { validationSchema, defaultValues } from './formikConfig';
import fb from "../../firebase"

//login form will only require email and password
const Login = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  //connects with firebase to log in properly and also has error handling
  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password) //returns a promise
      .then(res => { 
        if (!res.user) { //returns error if there is isn't a user object on result
          setServerError(
            "Error logging in. Please try again.",
          );
        }
      })
      .catch(err => { //catches the error object for multiple cases
        if (err.code === 'auth/wrong-password') {
          setServerError('Invalid credentials');
        } else if (err.code === 'auth/user-not-found') {
          setServerError('No existing credientials with this email');
        } else {
          setServerError('Error. Please try again'); //default error message for cases not checked for
        }
      })
      .finally(() => setSubmitting(false)); //succeed or fail, return false to setSubmitting
  };

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

            {/*disables the submit button if there is an error filling the forms*/}
            <button type="submit" disabled={!isValid || isSubmitting}>
              Login
            </button>

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
          </Form>
        )}
      </Formik>

      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};

export default Login