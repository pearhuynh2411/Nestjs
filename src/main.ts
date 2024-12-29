import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService} from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //add validation input
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService)

  //config swagger UI
  const configSwagger = new DocumentBuilder()
    .setTitle("API Youtube mini")
    .setDescription("Danh sách API Youtube mini")
    .setVersion("1.0")
    .addBearerAuth()

    .build(); // builder pattern

  const swagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("swagger", app, swagger);

  await app.listen(configService.get<number>('PORT') || 8080);
}
bootstrap();

//support javascript & typescript
//support code class component & functional component
//nest g resource user || tự động tạo cấu trúc API user
// Cài thư viện Swagger //
// yarn add @nestjs/swagger swagger-ui-express  :cài thư viện swagger
// Cài thư viện PRISMA //
// yarn add prisma @prisma/client :cài thư viện prisma
//yarn prisma init :tạo file prisma
//yarn prisma db pull :lấy data từ db về
//yarn prisma generate :tạo prisma client
//yarn add class-transformer class-validator

//yarn add @nestjs/config : giúp load file .env
// Upload image
//yarn add multer @types/multer
//yarn add cloudinary multer-storage-cloudinary
// Send mail
//yarn add nodemailer

//Authentication
//yarn add @nestjs/config
//yarn add @nestjs/passport passport passport-local
//yarn add @nestjs/jwt passport-jwt
//yarn add -D @types/passport-jwt

//docker
//docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 mysql:latest