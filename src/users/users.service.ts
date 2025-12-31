import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  //사용자 이메일로 사용자 정보 조회
  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    });
  }

  //새 사용자 생성
  async createUser(email: string, password: string) {
    return await this.prisma.user.create({
      data: { email, password },
    });
  }
}
