const path = require("path");
const Email = require("email-templates");
const transport = require("../config/email");

const sendMail = async ({ request }, callback) => {
  const { from, to, template } = request;

  const email = new Email({
    views: {
      root: path.resolve(__dirname, "..", "emails"),
    },
    message: {
      from,
    },
    send: true,
    transport,
  });

  await email.send({
    template,
    message: {
      to,
    },
    locals: {
      name: to,
    },
  });

  callback(null, request);
};

module.exports = sendMail;
