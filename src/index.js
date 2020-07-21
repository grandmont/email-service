const path = require("path");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

require("./config/environment");

// RPC Functions
const sendMail = require("./functions/sendMail");
const counter = require("./functions/counter");

const { emailPackage } = grpc.loadPackageDefinition(
  protoLoader.loadSync(path.join(__dirname, "email.proto"))
);

const { PORT = 40000 } = process.env;

const server = new grpc.Server();
server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
server.addService(emailPackage.Email.service, {
  sendMail,
  test: counter,
});

server.start();

console.log(`Email service running on 0.0.0.0:%s`, PORT);
