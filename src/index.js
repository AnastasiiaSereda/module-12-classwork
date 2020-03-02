import './styles.css';

const refs = {
  form: document.querySelector('.form-panel'),
  userName: document.querySelector('#userName'),
  password: document.querySelector('#password'),
  button: document.querySelector('#buttonLogin'),
};
const submitData = function(e) {
  e.preventDefault();
  const userName = refs.userName.value;
  const password = refs.password.value;

  const userData = {
    login: userName,
    password: password,
  };
  postData('https://venify.herokuapp.com/user/login', userData)
    .then(response => console.log(response))
    .catch(error => console.error(error));
  
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
