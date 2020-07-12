let counter = 0;

export default async (call, callback) => {
  counter += 1;
  callback(null, { counter });
};
