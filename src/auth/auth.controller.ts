import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './gaurds/google-oauth.gaurd';
import { ApiTags } from '@nestjs/swagger';
import { RequestIdInterceptor } from 'src/shared/interceptors/request-id.interceptor';

@ApiTags('Auth')
@UseInterceptors(RequestIdInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.status(HttpStatus.OK).send(`
      <!Doctype html>
      <html>
        <head>
          <script>
            localStorage.setItem('user-token', "${token}")
          </script>
        </head>
      </html>
    `);
  }
}