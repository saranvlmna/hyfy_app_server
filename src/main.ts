import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import serverless = require('serverless-http');
const port = parseInt(process.env.APP_PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = '.netlify/functions/main';
  app.setGlobalPrefix(globalPrefix);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverless(expressApp)
  // await app.listen(port, () => {
  //   Logger.log(`Let's talk ${port}`);
  // });
}
let server;
export const handler = async (event, context, callback) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
}
