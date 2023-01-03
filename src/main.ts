import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import Express from "express";
import morgan from "morgan";
import { ExpressAdapter } from "@nestjs/platform-express";
import { HttpExceptionsFilter } from "./exception";

import "dotenv/config";

// import bodyParser from 'body-parser';
import { AppModule } from "./app.module";

const server = Express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    cors: process.env.NODE_ENV === "dev",
  });

  app.use(
    helmet({
      // contentSecurityPolicy: sets all of the defaults, but overrides frame-ancestors
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "frame-ancestors": [`'none'`],
        },
      },
    })
  );

  //enable cors
  app.enableCors();
  

  // const appp = await NestFactory.create(AppModule);
  // appp.enableCors();
  // await appp.listen(3000);

  // X-XSS-Protection
  app.use((req, res, next) => {
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  // app.use(bodyParser.json({ limit: '50mb' }));
  // app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use(morgan("combined"));
  app.setGlobalPrefix("api/v1");

  // handle 404 not found
  app.useGlobalFilters(new HttpExceptionsFilter());

  const server2 = await app.listen(process.env.PORT || 3000);
  server2.setTimeout(600000);
}
bootstrap();
