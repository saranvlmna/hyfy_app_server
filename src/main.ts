import { BadGatewayException, Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
const port = parseInt(process.env.APP_PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        throw new BadGatewayException({
          message: JSON.stringify(errors[0]['constraints']),
          status: 400,
        });
      },
    }),
  );
  await app.listen(port, () => {
    Logger.log(`Let's talk ${port}`);
  });
}
bootstrap();
