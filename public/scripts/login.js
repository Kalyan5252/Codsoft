import axios from 'axios';
import { showAlert } from './alerts';

// const loginForm = document.querySelector(".form--login");

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8800/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    // console.log('got into login function');
    if (res.data.status === 'success') {
      showAlert('login_success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('login_failure', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    console.log('logout function');
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8800/api/v1/users/logout',
    });
    if ((res.data.status = 'success')) location.assign('/');
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    console.log('signup fn');
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8800/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('login_success', 'Account created successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('login_failure', err.response.data.message);
  }
};
