import $ from 'jquery';
import axios from 'axios';

export const getApiData = (url, setApiData) => {
  return axios.get(url)
    .then((response) => {
      // handle success
      setApiData(response.data);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
};

// Get random users. See:  https://randomuser.me/
// https://randomuser.me/documentation#format

export const randomUserPic = () => {
  // Math.random gives you a number between 0 and 1
  const rand = Math.random();
  const randInt = Math.floor(rand * 100); // random Integer between 0 and 100
  const gender = randInt % 2  === 0 ? 'men' : 'women';
  return `https://randomuser.me/api/portraits/thumb/${gender}/${randInt}.jpg`;
};

export const capitalize = (word) => {
  const rest = word.slice(1);
  const firstLtr = word.charAt(0);
  return firstLtr.toUpperCase() + rest.toLowerCase();
};

export const randomUser = (setState) => {
  const user = {
    firstname: 'hello',
    lastname: 'world',
    picture: 'https://images.cdn.stuff.tv/sites/stuff.tv/files/avatar.png'
  };
  const setUserInfo = (data) => {
    user.firstname = capitalize(data.results[0].name.first);
    user.lastname = capitalize(data.results[0].name.last);
    user.picture = data.results[0].picture.thumbnail;
    setState(user);
  };
  $.ajax({
    url: 'https://randomuser.me/api/?nat=us',
    dataType: 'json',
    success(data) {
      setUserInfo(data);
    }
  });
};

export const getPageName = (url) => {
  return url.split('/').pop();
};
export const dateFormatted = (dateStr) => {
  return dateStr ? new Date(dateStr).toDateString() : '';
};