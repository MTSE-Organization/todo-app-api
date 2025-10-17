import { EmailDecorator, StringDecorator } from '@/common/decorators';
import { Match } from '@/common/validators/match.validator';
import { Matches } from 'class-validator';

export class RegisterForm {
  @EmailDecorator('email', true)
  email: string;

  @StringDecorator('password', true)
  @Matches(/^.{8,}$/, {
    message: 'Password must be at least 8 characters long'
  })
  password: string;

  @StringDecorator('confirmPassword', true)
  @Match('password', { message: 'Confirm password must match password' })
  confirmPassword: string;
}
