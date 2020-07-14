const path = require("path");
const Email = require("email-templates");
const transport = require("../config/email");

const sendMail = async ({ request }, callback) => {
  const { from, to, template } = request;

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
    send: true,
    transport: {
      jsonTransport: true,
    },
  });

  await email.send({
    template,
    message: {
      to,
    },
    locals: {
      product: {
        name: "Kordy",
        logo: null,
        url: "https://github.com/arcmena",
        address: "Avenida Paulista, 1200 - São Paulo - SP",
      },
      recipient: {
        name: to,
        email: to,
      },
      header: {
        title: `Welcome, gabepereira!`,
      },
      content: {
        presentation: `We are so happy to have you with us!
          Click on the button below to activate your account and get access to all our features.`,
        ending: "Kordy team.",
      },
      action: {
        title: "Confirm my registration!",
        url: "https://github.com/gabepereira",
        type: "registration",
      },
      footer: {
        copy: `2020 - Kordy. All rights reserved.`,
        unsubscribe: "https://github.com/grandmont",
      },
    },
  });

  callback(null, request);
};

module.exports = sendMail;
