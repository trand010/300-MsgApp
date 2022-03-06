import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormField from '../FormField/formField';
import { defaultValues, validationSchema } from './formikConfig';

//fills out the field for registration and uses index.css to set up the regisration page
const Registration = () => {

  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const signup = ({ email, userName, password }, { setSubmitting }) => console.log('Signing Up: ', email, userName, password);

  //uses the 4 forms to create a new user
  //uses formik to create regisration page and fill formfields
  return (
    <div className="auth-form">
      <h1>Registration</h1>
      <Formik
        onSubmit={signup}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name="userName" label="Username" />
            <FormField name="email" label="Email" type="email" />
            <FormField name="password" label="Password" type="password" />
            <FormField
              type="password"
              name="verifyPassword"
              label="Confirm Password"
            />

            {/*create an onclick div to go to the login page if user already has an account*/}
            <div className="auth-link-container">
              Previous User?{' '}
              <span className="auth-link" onClick={() => history.push('login')}>
                Log In Here
              </span>
            </div>

            {/*if the form is not valid, iyyt disables the submit button if there is an error filling the forms*/}
            <button disabled={isSubmitting || !isValid} type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>

      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};

export default Registration;
