export const splitCapitalizeName = (name) => {
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

export const capitalizeName = (name) => {
  return `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
};

export const lastFirst = (name) => {
  const splitted = name.split(" ");
  const converted = `${splitted[1]}, ${splitted[0]}`;
  return converted;
};

export const combineFirstLast = (firstname, lastname) => {
  return `${firstname} ${lastname}`;
};
