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
    preview: false,
    send: true,
    transport,
  });

  const data = {
    product: {
      name: "Kordy",
      logo: "https://grpc.io/img/logos/grpc-horizontal-white.png",
      url: "https://grpc.io/",
      address: "Avenida Paulista, 1200 - São Paulo - SP",
    },
    recipient: {
      name: "gabepereira",
      email: to,
    },
    header: {
      title: `Welcome, gabepereira!`,
    },
    content: {
      presentation: `We are so happy to have you with us!
        Click on the button below to activate your account and get access to all our features.`,
      ending: `Kordy team.`,
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
  };

  // const {
  //   product: { name, logo, url, address },
  //   recipient: { name: recipientName, email },
  //   header: { title },
  //   content: { presentation, ending },
  //   action: { title, url, type },
  //   footer: { copy, unsubscribe },
  // } = data;

  await email.send({
    template,
    message: {
      to,
    },
    locals: data,
  });

  callback(null, request);
};

module.exports = sendMail;
