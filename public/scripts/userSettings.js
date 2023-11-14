import axios from 'axios';
import { showAlert } from './alerts';

export const updateProfile = async (data) => {
  try {
    const url = 'http://127.0.0.1:8800/api/v1/users/updateUserData';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('login_success', 'Profile updated Successfully');
      location.reload(true);
    }
  } catch (error) {
    showAlert('login_failure', err.response.data.message);
  }
};

export const makeReivew = async (data) => {
  try {
    const url = 'http://127.0.0.1:8800/api/v1/reviews/';
    const res = await axios({
      method: 'POST',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('login_success', 'Profile updated Successfully');
      // console.log('review successful');
      location.reload(true);
    }
  } catch (err) {
    showAlert('login_failure', err.response.data.message);
  }
};

export const makePurchase = async (data) => {
  try {
    // console.log('make Purchase');
    const url = `http://127.0.0.1:8800/api/v1/purchases/checkout-session/${data}`;
    const res = await axios({
      method: 'GET',
      url,
    });
    if (res.data.session.id) {
      // console.log(res);
      location.assign(res.data.session.url);
    } else {
      location.assign('http://127.0.0.1:8800/login');
    }
  } catch (err) {
    location.assign('http://127.0.0.1:8800/login');
    showAlert('login_failure', err.response.data.message);
  }
};
