import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { IsEmailUnique } from './validators/is-email-unique.validator';

@Module({
  providers: [UserService, IsEmailUnique],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [UserService]
})
export class UserModule { }
