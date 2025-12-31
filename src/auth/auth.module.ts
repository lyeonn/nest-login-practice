import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Import UsersModule to use UsersService

@Module({
  imports: [UsersModule], // Ensure UsersModule is imported to use UsersService
  providers: [AuthService],
})
export class AuthModule {}
