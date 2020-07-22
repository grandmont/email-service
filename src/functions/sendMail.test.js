const Email = require("email-templates");
const sendMail = require("./sendMail");
const locals = require("../utils/template");

// Mocks
const callback = jest.fn();
jest.mock("email-templates");

// sendMail.js tests
describe("functions/sendMail.js", () => {
  // Reset mock functions after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should send an email", async (done) => {
    const request = {
      from: "test@kordy.com",
      recipient: {
        name: "test",
        email: "test@example.com",
      },
      action: "http://jestjs.io",
      template: "welcome",
    };

    await sendMail({ request }, callback);

    const { recipient, action, template } = request;

    const mockSend = Email.mock.instances[0].send;

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith({
      template: "main",
      message: {
        to: "test@example.com",
      },
      locals: locals[template]({ recipient, action }),
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, request);
    done();
  });
});
