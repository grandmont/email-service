const {
  PRODUCT_NAME,
  PRODUCT_LOGO,
  PRODUCT_URL,
  PRODUCT_ADDRESS,
  UNSUBSCRIBE,
} = process.env;

const product = {
  name: PRODUCT_NAME,
  logo: PRODUCT_LOGO,
  url: PRODUCT_URL,
  address: PRODUCT_ADDRESS,
};

// Welcome template locals
const welcome = ({ recipient, action }) => ({
  product,
  recipient,
  header: {
    title: `Welcome, ${recipient.name}!`,
  },
  content: {
    presentation: `We are so happy to have you with us!
          Click on the button below to activate your account and get access to all our features.`,
    ending: `${PRODUCT_NAME} team.`,
  },
  action: {
    title: "Confirm my registration!",
    url: action,
    type: "registration",
  },
  footer: {
    copy: `2020 - ${PRODUCT_NAME}. All rights reserved.`,
    unsubscribe: UNSUBSCRIBE,
  },
});

module.exports = { welcome };
