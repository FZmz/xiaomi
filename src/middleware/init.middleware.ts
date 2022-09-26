import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from 'src/config/config';
import { Helper } from 'src/extend/help';
@Injectable()
export class InitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.locals.config = Config;
    res.locals.helper = Helper;
    next();
  }
}
