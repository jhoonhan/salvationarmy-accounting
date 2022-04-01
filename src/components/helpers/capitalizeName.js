const capitalizeName = (name) => {
  const lowerCase = name.toLowerCase();
  const capitalized = lowerCase
    .split(" ")
    .map((el) => {
      const nameArr = el[0].toUpperCase() + el.slice(1);
      return nameArr;
    })
    .join(" ");
  return capitalized;
};

export default capitalizeName;
