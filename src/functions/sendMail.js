const path = require("path");
const Email = require("email-templates");
const transport = require("../config/email");
const locals = require("../utils/template");

module.exports = async ({ request }, callback) => {
  const { from, recipient, action, template } = request;

  const email = new Email({
    views: {
      root: path.resolve(__dirname, "..", "emails"),
    },
    juice: true,
    juiceResources: {
      preserveImportant: true,
      webResources: {
        relativeTo: path.resolve(__dirname, "..", "assets"),
      },
    },
    message: {
      from,
    },
    preview: false,
    send: true,
    transport,
  });

  await email.send({
    template,
    message: {
      to: recipient.email,
    },
    locals: locals[template]({ recipient, action }),
  });

  callback(null, request);
};
