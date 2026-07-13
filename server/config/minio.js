import { Client } from "minio";

export const minioClient = new Client({
  endPoint: "host.docker.internal",
  port: 9000,
  useSSL: false,
  accessKey: "admin",
  secretKey: "password123",
});
