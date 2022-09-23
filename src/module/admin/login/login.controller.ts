import { Controller, Get, Render, Request, Response } from '@nestjs/common';
import { ToolsService } from 'src/service/tools/tools.service';
@Controller('admin/login')
export class LoginController {
  constructor(private toolsService: ToolsService) {}
  @Get()
  @Render('admin/login')
  index() {
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
}
