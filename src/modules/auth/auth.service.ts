import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { RegisterForm } from './forms/register.form';
import { BadRequestException, NotFoundException } from '@/common/exceptions';
import { Constant, ErrorCode } from '@/constants';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordForm, ForgotPasswordForm } from './forms';
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

  async forgotPassword(form: ForgotPasswordForm) {
    const account = await this.accountService.findByEmailAndStatus(
      form.email,
      Constant.STATUS_ACTIVE
    );
    if (!account) {
      throw new NotFoundException(
        'Account not found',
        ErrorCode.ACCOUNT_ERROR_NOT_FOUND
      );
    }

    return {
      message: 'Send OTP successfully'
    };
  }

  async changePassword(accountId: bigint, form: ChangePasswordForm) {
    const account = await this.accountService.findById(accountId);
    if (account.email !== form.email) {
      throw new BadRequestException(
        'Account invalid email',
        ErrorCode.ACCOUNT_ERROR_EMAIL_INVALID
      );
    }
    if (form.password !== form.confirmPassword) {
      throw new BadRequestException(
        'Password and Confirm Password do not match',
        ErrorCode.AUTH_ERROR_PASSWORD_MISMATCH
      );
    }
    await this.accountService.changePassword(form.email, form.password);
    return { message: 'Change password successfully' };
  }
}
