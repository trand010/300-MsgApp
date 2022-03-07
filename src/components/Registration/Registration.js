import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormField from '../formField';
import { defaultValues, validationSchema } from './formikConfig';
import fb from '../../firebase';

//fills out the field for registration and uses index.css to set up the regisration page
const Registration = () => {

  const history = useHistory();
  const [serverError, setServerError] = useState('');

  //connects to firebase and chatengine to registers new user
  const signup = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => { //if succeed, takes result and create a new user
        if (res?.user?.uid) { //optional chaining
          fetch('/api/newUser', { //store user UID and username to chatengine
            method: 'POST',
            body: JSON.stringify({
              userName,
              userId: res.user.uid,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(() => { //if successful, store user UID and username into firestore
            fb.firestore
              .collection('chatUsers')
              .doc(res.user.uid)
              .set({userName});
          });
        } else {
          setServerError(
            "Error. Please try again.",
          );
        }
      })
      .catch(err => { //checks to see if email has already been used
        if (err.code === 'auth/email-already-in-use') {
          setServerError('An account with this email already exists');
        } else {
          setServerError(
            "Error. Please try again.", //default error message for cases not checked for
          );
        }
      })
      .finally(() => setSubmitting(false)); //succeeed or fail, return false to setSubmitting
  };

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

            {/*if the form is not valid, it disables the submit button if there is an error filling the forms*/}
            <button disabled={isSubmitting || !isValid} type="submit">
              Sign Up
            </button>

            {/*create an onclick div to go to the login page if user already has an account*/}
            <div className="auth-link-container">
              Previous User?{' '}
              <span className="auth-link" onClick={() => history.push('login')}>
                Log In Here
              </span>
            </div>

          </Form>
        )}
      </Formik>

      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};

export default Registration;
