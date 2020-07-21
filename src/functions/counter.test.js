const counter = require("./counter");

// Mocks
const callback = jest.fn();

// test.js tests
describe("functions/test.js", () => {
  // Reset mock functions after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return the counter value 1 when calling it once", (done) => {
    counter(null, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, { counter: 1 });
    done();
  });

  it("Should return the counter value 2 when calling it twice", (done) => {
    counter(null, callback);
    counter(null, callback);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(null, { counter: 2 });
    done();
  });
});
