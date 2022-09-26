import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  Response,
} from '@nestjs/common';
import { ToolsService } from 'src/service/tools/tools.service';
import { AdminService } from 'src/service/admin/admin.service';
@Controller('admin/login')
export class LoginController {
  constructor(
    private toolsService: ToolsService,
    private adminService: AdminService,
  ) {}
  @Get()
  @Render('admin/login')
  async index() {
    return '';
  }

  @Get('code')
  getCode(@Request() req, @Response() res) {
    const svgCaptcha = this.toolsService.captcha();
    // 设置session
    req.session.code = svgCaptcha.text;
    res.type('image/svg+xml');
    res.send(svgCaptcha.data);
    return {};
  }
  @Post('doLogin')
  async doLogin(@Body() body, @Request() req, @Response() res) {
    try {
      const code: string = body.code;
      const username = body.username;
      const password = body.password;
      console.log(password);
      if (username === '' || password.length < 6) {
        console.log('用户名 或者密码不合法');
      } else {
        if (code.toUpperCase() === req.session.code.toUpperCase()) {
          const userResult = await this.adminService.find({
            username: username,
            password: password,
          });
          if (userResult.length > 0) {
            console.log('登陆成功！');
            req.session.userinfo = userResult[0];
            console.log(req.session.userinfo);
            await res.render('admin/public/success', {
              redirectUrl: '/admin/main',
            });
          } else {
            console.log('用户名或者密码不正确');
            await res.render('admin/public/error', {
              message: '用户名或者密码不正确',
              redirectUrl: '/admin/login',
            });
          }
        } else {
          await res.render('admin/public/error', {
            message: '用户不存在',
            redirectUrl: '/admin/login',
          });
        }
      }
    } catch (err) {
      await res.render('admin/public/error', {
        message: '验证码不正确',
        redirectUrl: '/admin/login',
      });
    }
  }
  @Get('loginOut')
  loginOut(@Request() req, @Response() res) {
    req.session.userinfo = null;
    res.redirect('/admin/login');
  }
}
