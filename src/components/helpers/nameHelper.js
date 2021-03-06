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
  const converted = `${splitted.slice(-1)[0]}, ${splitted[0]}`;
  return converted;
};

export const lastFirstExt = (name) => {
  if (!name) return;
  const splitted = name.split(" ");
  const converted = `${splitted.slice(-1)[0]}, ${splitted
    .slice(0, -1)
    .join(" ")}`;
  return converted;
};

export const combineFirstLast = (firstname, lastname) => {
  return `${firstname} ${lastname}`;
};

export const lastFirstInitial = (name) => {
  if (!name) return;
  const splitted = name.split(" ");
  const converted = `${splitted.slice(-1)[0]}, ${splitted[0][0]}`;
  return converted;
};

export const firstLastInitial = (name) => {
  if (!name) return;
  const splitted = name.split(" ");
  const converted = `${splitted[0]}, ${splitted.slice(-1)[0][0]}`;
  return converted;
};

export const firstExtendLastInitial = (name) => {
  if (!name) return;
  const splitted = name.split(" ");
  const converted = `${splitted.slice(0, -1).join(" ")}, ${
    splitted.slice(-1)[0][0]
  }`;
  return converted;
};

export const getName = (users, order) => {
  const userFound = users.find((user) => user._id === order.userId);
  return {
    lastname: userFound.lastname,
    firstname: userFound.firstname,
    name: userFound.name,
  };
};
