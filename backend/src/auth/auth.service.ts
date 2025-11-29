import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { UserDocument } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async register(createUserDto: CreateUserDto): Promise<void> {
        const hash = await argon.hash(createUserDto.password);
        await this.userService.create({ ...createUserDto, password: hash });
    }

    async validateUser(email: string, password: string): Promise<UserDocument | null> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return null;
        }
        const isMatch = await argon.verify(user.password, password);
        if (!isMatch) {
            return null;
        }
        return user;
    }

    async login(user: UserDocument): Promise<{ access_token: string }> {
        const payload = { sub: user._id, email: user.email };
        const token = await this.jwtService.signAsync(payload);
        return {
            access_token: token,
        };
    }
}
