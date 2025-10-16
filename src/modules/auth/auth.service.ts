import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { RegisterForm } from './forms/register.form';
import { BadRequestException } from '@/common/exceptions';
import { ErrorCode } from '@/constants';
import { JwtService } from '@nestjs/jwt';
import { UserDetailsDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService
  ) {}

  async register(form: RegisterForm) {
    const account = await this.accountService.findByEmail(form.email);
    if (account) {
      throw new BadRequestException(
        'Account already exists',
        ErrorCode.ACCOUNT_ERROR_EMAIL_EXISTED
      );
    }
    if (form.password !== form.confirmPassword) {
      throw new BadRequestException(
        'Password and Confirm Password do not match',
        ErrorCode.AUTH_ERROR_PASSWORD_MISMATCH
      );
    }
    await this.accountService.createUser(form);

    return {
      message: 'Register successfully'
    };
  }

  async login(user: UserDetailsDto) {
    const payload = { ...user };
    const token = await this.jwtService.signAsync(payload);
    return { message: 'Login successfully', token };
  }
}
