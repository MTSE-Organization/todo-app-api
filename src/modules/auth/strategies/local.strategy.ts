import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountService } from '@/modules/account/account.service';
import { UserDetailsDto } from '../dtos';
import { plainToInstance } from 'class-transformer';
import { LoginForm } from '../forms';
import { validate } from 'class-validator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private accountService: AccountService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<UserDetailsDto> {
    const form = plainToInstance(LoginForm, { email, password });
    const errors = await validate(form, {
      skipMissingProperties: false, // bắt lỗi nếu thiếu field
      forbidUnknownValues: true, // từ chối nếu có object lạ
      stopAtFirstError: false // gom tất cả lỗi cùng lúc
    });

    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();

      throw new BadRequestException(messages);
    }

    return await this.accountService.validateUser(form.email, form.password);
  }
}
