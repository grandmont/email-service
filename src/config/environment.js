const { NODE_ENV } = process.env;

require("dotenv").config({
    path: `${__dirname}/../../.env.${NODE_ENV || "development"}`,
});
