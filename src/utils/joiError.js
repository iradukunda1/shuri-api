export default err => {
  const error = {};
  const { details } = err;
  details.forEach(element => {
    const {
      context: { key, label }
    } = element;
    error[key] = label;
  });
  return error;
};
