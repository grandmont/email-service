let counter = 0;

const test = async (call, callback) => {
  counter += 1;
  callback(null, { counter });
};

module.exports = test;
