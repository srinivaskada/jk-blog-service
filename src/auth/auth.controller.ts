import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './gaurds/google-oauth.gaurd';
import { ApiTags } from '@nestjs/swagger';
import { RequestIdInterceptor } from 'src/shared/interceptors/request-id.interceptor';
import { ConfigService } from '@nestjs/config';
import { AuthorizedCommonRequest, CommonRequest } from 'src/shared/dto/common-request.dto';

@ApiTags('Auth')
@UseInterceptors(RequestIdInterceptor)
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async authGoogle() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: Request & AuthorizedCommonRequest, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);

    res.status(HttpStatus.OK).send(`
      <!Doctype html>
      <html>
        <head>
          <script>
            setTimeout(() => {
              window.open("${this.configService.get('UI_DOMAIN_ADDRESS')}/auth/capture-token/${token}", '_self');
            }, 1000)
          </script>
        </head>
        <body>
          <p>Redirecting you...</p>
          <p>Please click <a href="${this.configService.get('UI_DOMAIN_ADDRESS')}/auth/capture-token/${token}" targe="_self">here</a> to redirect </p>
        </body>
      </html>
    `)
  }

  @Get('facebook')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async authFacebook() {}

  @Get('facebook/callback')
  @UseGuards(GoogleOauthGuard)
  async facebookAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);
    return `
      <!Doctype html>
      <html>
        <head>
          <script>
            localStorage.setItem('user-token', "${token}")
          </script>
        </head>
      </html>
    `
  }
}