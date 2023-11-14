const slides = document.querySelectorAll('.slide_container');
const left_sbtn = document.querySelector('.slide_arr_left');
const right_sbtn = document.querySelector('.slide_arr_right');
const slide_box = document.querySelector('.slide_indicator');
const moveBtn = document.querySelector('.nav__but');
const id = document.getElementById('slide-4');
const Sections = document.querySelectorAll('section');
const navigation = document.getElementById('navigation');
const headerSec = document.getElementById('header__sec');
const coverImage = document.querySelector('.product_coverimg');
const images = document.querySelectorAll('.pr_image');
const reviewBtn = document.getElementById('add_review');
const reviewForm = document.getElementById('userReviewForm');

// let rateStarContainer = document.querySelector('.rating-container');
const rateStarContainer = document.querySelector('.rating-container');
const newReviewContainer = document.querySelector('.new__review');

images.forEach((el) => {
  el.addEventListener('mouseover', function (e) {
    let pr_element = e.target;
    images.forEach((i) => {
      i.style.border = 'none';
      i.style.boxShadow = 'none';
    });
    pr_element.style.border = 'solid 1px black';
    pr_element.style.boxShadow = '0 0 5px rgba(0,0,0,0.5)';

    // console.log(pr_element);
    coverImage.src = pr_element.src;
  });
});
// if (reviewBtn) {
//   reviewBtn.addEventListener('click', function (e) {
//     e.preventDefault();
//     newReviewContainer.removeChild(reviewBtn);
//     const html = `
//     <form class="newRatingSec">
//       <div class="add_rating">
//         <h3 class="rating_label">Select Rating:</h3>
//         <div class="rating-container">
//           <input type="radio" id="star1" name="rating" value="1" />
//           <label for="star1"></label>
//           <input type="radio" id="star2" name="rating" value="2" />
//           <label for="star2"></label>
//           <input type="radio" id="star3" name="rating" value="3" />
//           <label for="star3"></label>
//           <input type="radio" id="star4" name="rating" value="4" />
//           <label for="star4"></label>
//           <input type="radio" id="star5" name="rating" value="5" />
//           <label for="star5"></label>
//         </div>
//       </div>
//       <div class="add_review_detail">
//         <h3 class="rating_label">Review:</h3>
//         <textarea name="" id="" cols="50" rows="5"></textarea>
//       </div>
//       <button class="submit_review">Submit</button>
//     </form>
//     <script src="/scripts/bundle.js"></script>
//     `;
//     // console.log("html element insertion");
//     newReviewContainer.insertAdjacentHTML('afterbegin', html);
//     rateStarContainer = document.querySelector('.rating-container');

//     rateStarContainer.addEventListener('click', function (e) {
//       // console.log(e.target);
//       if (e.target.value) {
//         const val = e.target.value;
//         const stars = rateStarContainer.querySelectorAll('label');
//         // console.log(stars);
//         stars.forEach((el) => {
//           el.style.color = '#ccc';
//         });
//         stars.forEach((el, i) => {
//           if (i < val) el.style.color = '#ffcc00';
//         });
//       }
//     });
//   });
// }

reviewForm.style.display = 'none';

reviewBtn.addEventListener('click', function (e) {
  e.preventDefault();
  newReviewContainer.removeChild(reviewBtn);
  reviewForm.style.display = 'block';
});

const submitfn = function () {
  const reviewSubmitBtn = document.querySelector('.submit_review');
  reviewSubmitBtn.addEventListener('click', function () {
    const sec = document.querySelector('.newRatingSec');
    // console.log("submit btn");
    newReviewContainer.removeChild(sec);
  });
};

rateStarContainer.addEventListener('click', function (e) {
  // console.log(e.target);
  if (e.target.value) {
    const val = e.target.value;
    const stars = rateStarContainer.querySelectorAll('label');
    // console.log(stars);
    stars.forEach((el) => {
      el.style.color = '#ccc';
    });
    stars.forEach((el, i) => {
      if (i < val) el.style.color = '#ffcc00';
    });
  }
});

// if (rateStarContainer) {
//   rateStarContainer.addEventListener("click", function (e) {
//     if (e.target.value) {
//       const val = e.target.value;
//       const stars = rateStarContainer.querySelectorAll("label");
//       console.log(stars);
//       stars.forEach((el) => {
//         el.style.color = "#ccc";
//       });
//       stars.forEach((el, i) => {
//         if (i < val) el.style.color = "#ffcc00";
//       });
//     }
//   });
// }
