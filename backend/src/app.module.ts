import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import authConfig from './config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/default-db'),
    AuthModule,
    UserModule,
  ],
})
export class AppModule { }