import transport from "../config/mail";
import Email from "email-templates";

export default async ({ request }, callback) => {
  console.log(request);

  const { from, to, subject, template } = request;

  const email = new Email({
    message: {
      from,
    },
    send: true,
    transport,
  });

  await email.send({
    template: "welcome",
    message: {
      subject,
      to,
    },
    locals: {
      name: "Elon",
    },
  });

  callback(null, request);
};
