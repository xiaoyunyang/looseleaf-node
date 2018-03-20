// Get random users. See:  https://randomuser.me/

const randomUserPic = () => {
  // Math.random gives you a number between 0 and 1
  const rand = Math.random();
  const randInt = Math.floor(rand * 100); // random Integer between 0 and 100
  const gender = randInt % 2  === 0 ? 'men' : 'women';
  return `https://randomuser.me/api/portraits/thumb/${gender}/${randInt}.jpg`;
}

export { randomUserPic };
