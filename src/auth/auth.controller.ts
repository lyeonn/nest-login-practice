import { Body, Controller, Post } from '@nestjs/common';
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
    return await this.authService.signUp(body.email, body.password);
  }

  //로그인
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(
    @Body() body: SignInLocalRequestDto,
  ): Promise<SignInLocalResponseDto | null> {
    //여기에서 null이 빠지면?
    //여기서 이제 jwt 로직 구현해야함 아래 내용 지우기
    return req.user;
  }
}
