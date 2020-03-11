import './styles.css';
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';
import imageList from './template/template.hbs';

const apiUrl = 'https://venify.herokuapp.com';

const refs = {
  form: document.querySelector('.form-panel'),
  userName: document.querySelector('#userName'),
  password: document.querySelector('#password'),
  button: document.querySelector('#buttonLogin'),
  imagesList: document.querySelector('.swiper-wrapper'),
};

const submitData = async function(e) {
  e.preventDefault();
  const userName = refs.userName.value;
  const password = refs.password.value;

  const userData = {
    login: userName,
    password: password,
  };
  // переписать на async await
  try {
    const { token } = await postData(`${apiUrl}/user/login`, userData);
    return getMatchedList(token);
  } catch (error) {
    console.log(error);
  }
};

refs.form.addEventListener('submit', submitData);

function postData(url, data = {}) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  }).then(response => response.json());
}

function getMatchedList(token) {
  return fetch(`${apiUrl}/user/mathchedList`, {
    headers: {
      authorization: token,
    },
  })
    .then(response => response.json())
    .then(data => {
      const images = data.map(({ image_list }) => image_list[0]);
      refs.imagesList.insertAdjacentHTML('beforeend', imageList(images));

      new Swiper('.swiper-container', {
        speed: 400,
        spaceBetween: 100,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });
}
