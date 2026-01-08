import { Body, Controller, Post, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignInLocalRequestDto } from './dto/signInlocal.request.dto';
import { SignInLocalResponseDto } from './dto/signInlocal.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //회원가입
  @Post('signup')
  async signUp(@Body() body: SignInLocalRequestDto) {
    return await this.authService.createUser(body.email, body.password);
  }

  //로그인
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  signIn(@Request() req: { user: SignInLocalResponseDto }) {
    //왜 Request로 할까? Passport가 request에 user를 담아주기 때문
    return this.authService.createAccessToken(req.user);
  }
}
