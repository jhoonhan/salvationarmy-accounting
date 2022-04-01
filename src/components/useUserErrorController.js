const useUserErrorController = (userError) => {
  const error = {
    type: null,
    message: "",
  };

  if (!userError) return error;

  if (userError.name === "ValidationError") {
    const fields = Object.keys(userError.errors);
    if (fields.includes("name")) {
      error.type = `noUserName`;
    }
  }

  if (userError.name === "SelectSunday") {
    error.type = "SelectSunday";
    error.message = "You must select Sunday";
  }

  return error;
};

export default useUserErrorController;
