import path from "path";
import Email from "email-templates";
import transport from "../config/email";

export default async ({ request }, callback) => {
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
