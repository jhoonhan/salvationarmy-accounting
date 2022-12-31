const sortOrderByKey = (orders, prop) => {
  return orders.reduce((acc, obj) => {
    // console.log(acc);
    const key = obj[prop];
    if (!acc[key]) {
      acc[key] = [];
    }
    // Add object to list for given key's value
    acc[key].push(obj);
    return acc;
  }, {});
};

export default sortOrderByKey;
