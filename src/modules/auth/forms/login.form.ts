import { EmailDecorator, StringDecorator } from '@/common/decorators';
import { Matches } from 'class-validator';

export class LoginForm {
  @EmailDecorator('email', true)
  email: string;

  @StringDecorator('password', true)
  @Matches(/^.{8,}$/, {
    message: 'Password must be at least 8 characters long'
  })
  password: string;
}
