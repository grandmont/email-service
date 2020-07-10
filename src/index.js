import path from "path";
import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import "./config/environment";

// RPC Functions
import sendMail from "./functions/sendMail";

const packageDef = protoLoader.loadSync(
    path.join(__dirname, "protos", "mail.proto"),
    {}
);
const { mailPackage } = grpc.loadPackageDefinition(packageDef);

const { PORT = 40000 } = process.env;

const server = new grpc.Server();
server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
server.addService(mailPackage.Mail.service, {
    sendMail,
});

server.start();

console.log(`Mail microservice running on 0.0.0.0:%s`, PORT);
