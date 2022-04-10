const fn = (data) => {
  if (!data) return [];
  return Object.entries(data).map(([key, data]) => {
    const obj = {
      id: key,
      data,
    };
    return obj;
  });
};

export default fn;
