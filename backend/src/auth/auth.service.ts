import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async register(createUserDto: CreateUserDto): Promise<void> {
        const hash = await argon.hash(createUserDto.password);
        await this.userService.create({ ...createUserDto, password: hash });
    }
}
