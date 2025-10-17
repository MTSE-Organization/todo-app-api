import { EmailDecorator, StringDecorator } from '@/common/decorators';
import { Match } from '@/common/validators/match.validator';
import { Matches } from 'class-validator';

export class RegisterForm {
  @EmailDecorator('email', true)
  email: string;

  @StringDecorator('password', true)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least one letter and one number'
  })
  password: string;

  @StringDecorator('confirmPassword', true)
  @Match('password', { message: 'Confirm password must match password' })
  confirmPassword: string;
}
