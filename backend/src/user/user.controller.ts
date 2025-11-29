import { Controller, Get, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req: any) {
        const userId = req.user.userId;

        const user = await this.userService.findById(userId);

        if (!user) {
            throw new UnauthorizedException(`User with id ${userId} not found`);
        }
        return user;
    }
}