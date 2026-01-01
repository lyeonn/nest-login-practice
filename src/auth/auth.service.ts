import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInLocalResponseDto } from './dto/signInlocal.response.dto';
import { JwtService } from '@nestjs/jwt';
import { Sign } from 'crypto';

//AuthService는 사용자를 검색하고 비밀번호를 검증하는 역할을 한다.
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //회원가입 메서드
  async createUser(email: string, password: string) {
    const existUser = await this.usersService.findOneByEmail(email);
    if (existUser) {
      throw new Error('해당 이메일은 이미 회원가입이 되어있습니다.');
    }

    return await this.usersService.createUser(email, password);
  }

  //사용자 이메일과 비밀번호를 검증하는 메서드 - 로그인 메서드
  async validateUser(
    email: string,
    password: string,
  ): Promise<SignInLocalResponseDto | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.password === password) {
      return { email: user.email, id: user.id };
    }
    return null;
  }

  async login(user: SignInLocalResponseDto): Promise<{ access_token: string }> {
    const payload = { userId: user.id, email: user.email };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
