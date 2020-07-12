import path from "path";
import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import "./config/environment";

// RPC Functions
import sendMail from "./functions/sendMail";
import test from "./functions/test";

const { emailPackage } = grpc.loadPackageDefinition(
  protoLoader.loadSync(path.join(__dirname, "..", "protos", "email.proto"), {})
);

const { PORT = 40000 } = process.env;

const server = new grpc.Server();
server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
server.addService(emailPackage.Email.service, {
  sendMail,
  test,
});

server.start();

console.log(`Email microservice running on 0.0.0.0:%s`, PORT);
