import { Controller, Get } from '@nestjs/common';

@Controller('index')
export class IndexController {
  @Get()
  index() {
    return '我是前台首页';
  }
  @Get('news')
  news() {
    return '我是前台首页';
  }
}
