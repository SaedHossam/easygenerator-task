import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { IsEmailUnique } from './validators/is-email-unique.validator';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UserService, IsEmailUnique],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule)
  ],
  exports: [UserService]
})
export class UserModule { }
