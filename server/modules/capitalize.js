function capitalize(str) {
  const firstLetter = str.charAt(0).toUpperCase();
  const rest = str.slice(1).toLowerCase();
  return firstLetter + rest;
}

module.exports = capitalize;
