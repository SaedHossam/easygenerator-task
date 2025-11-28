import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'IsEmailUnique', async: true })
@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) { }

    async validate(email: string): Promise<boolean> {
        const user = await this.userService.findByEmail(email);
        return !user;
    }

    defaultMessage() {
        return 'Email is already in use';
    }
}
