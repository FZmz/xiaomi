import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const pathname = req.baseUrl; //获取访问的地址
    const userinfo = req.session.userinfo;

    // 1、获取session里面保存的用户信息
    const userInfo = req.session.userinfo;
    if (userInfo && userInfo.username) {
      next();
    } else {
      // 排除不需要做权限跳转的页面
      if (
        pathname == '/admin/login' ||
        pathname == '/admin/login/code' ||
        pathname == '/admin/login/doLogin'
      ) {
        next();
      } else {
        res.redirect('/admin/login');
      }
    }
  }
}
