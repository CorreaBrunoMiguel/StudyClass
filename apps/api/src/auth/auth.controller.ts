import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginSchema, SignupSchema } from './dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Get()
  health() {
    return { ok: true };
  }

  @Post('signup')
  signup(@Body() body: any) {
    const dto = SignupSchema.parse(body);
    return this.auth.signup(dto.email, dto.password);
  }

  @Post('login')
  login(@Body() body: any) {
    const dto = LoginSchema.parse(body);
    return this.auth.login(dto.email, dto.password);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: any) {
    return req.user; // { sub, email, role }
  }
}
