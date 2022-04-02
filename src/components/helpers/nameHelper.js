export const capitalizeName = (name) => {
  if (!name) return;
  if (name.split(" ").length > 1) {
    return name
      .split(" ")
      .map((el) => {
        const nameArr = el[0].toUpperCase() + el.slice(1);
        return nameArr;
      })
      .join(" ");
  } else {
    return `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
  }
};

export const lastFirst = (name) => {
  if (!name) return;
  const splitted = name.split(" ");
  const converted = `${splitted[1]}, ${splitted[0]}`;
  return converted;
};

export const combineFirstLast = (firstname, lastname) => {
  return `${firstname} ${lastname}`;
};
