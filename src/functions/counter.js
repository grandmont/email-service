let counter = 0;

module.exports = (call, callback) => {
  counter += 1;
  callback(null, { counter });
};
