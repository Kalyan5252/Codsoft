import { login, logout, signup } from './login';
import { updateProfile, makeReivew, makePurchase } from './userSettings';

const loginForm = document.querySelector('.form--login');
const buyProduct = document.querySelectorAll('.book-product');
const userDataForm = document.querySelector('.form_user');
const logoutBtn = document.querySelector('.logout');
const signupForm = document.querySelector('.signup__form');
const productBuy = document.querySelector('.details');
const reviewForm = document.querySelector('.newRatingSec');

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // console.log('got into loginForm function');
    // console.log({ email, password });
    login(email, password);
  });
if (buyProduct) {
  buyProduct.forEach((ele) => {
    if (ele) {
      ele.addEventListener('click', function (e) {
        e.target.textContent = 'Processing';
        const { productId } = e.target.dataset;
        console.log(productId);
        // location.assign(
        //   `http://127.0.0.1:8800/api/v1/purchases/checkout-session/${productId}`
        // );
        makePurchase(productId);
      });
    }
  });
}
if (productBuy) {
  productBuy.addEventListener('click', function (e) {
    e.preventDefault();
    e.target.textContent = 'Processing';
    const productId = e.target.dataset.productId;
    // location.assign(
    //   `http://127.0.0.1:8800/api/v1/purchases/checkout-session/${productId}`
    // );
    makePurchase(productId);
  });
}
if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('mobile', document.getElementById('mobile').value);
    form.append('address', document.getElementById('address').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateProfile(form, 'data');
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // console.log('logout button clicked');
    logout();
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    console.log({ name, email, password, confirmPassword });
    signup(name, email, password, confirmPassword);
  });
}
let rating;
if (reviewForm) {
  console.log('review form');
  document.querySelector('.rating-container').addEventListener('click', (e) => {
    if (e.target.value) {
      rating = e.target.value;
      // console.log(rating);
    }
  });
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const review = document.getElementById('review_context').value;
    // console.log({ rating, review });
    let slug = location.href.split('/');
    slug = slug[slug.length - 1];
    makeReivew({ rating, review, slug });
  });
}
