import {
  Body,
  Response,
  Controller,
  Get,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { RoleService } from 'src/service/role/role.service';
import { Config } from 'src/config/config';
import { ToolsService } from 'src/service/tools/tools.service';
@Controller(`${Config.adminPath}/role`)
export class RoleController {
  constructor(
    private roleService: RoleService,
    private toolsService: ToolsService,
  ) {}
  @Get()
  @Render('admin/role/index')
  async index() {
    const result = await this.roleService.find({});
    return {
      roleList: result,
    };
  }
  @Get('add')
  @Render('admin/role/add')
  async add() {
    return {};
  }
  @Post('doAdd')
  async doAdd(@Body() body, @Response() res) {
    console.log(body);

    if (body.tilte != '') {
      const result = await this.roleService.add(body);
      if (result) {
        this.toolsService.success(res, `/${Config.adminPath}/role`);
      } else {
        this.toolsService.error(res, '增加失败', `/${Config.adminPath}/role`);
      }
    } else {
      this.toolsService.error(res, '标题不能为空', `/${Config.adminPath}/role`);
    }

    return {};
  }
  @Get('edit')
  @Render('admin/role/edit')
  async edit(@Query() query) {
    const result = await this.roleService.find({ _id: query.id });
    return {
      roleItem: result[0],
    };
  }
  @Post('doEdit')
  async doEdit(@Body() body, @Response() res) {
    console.log(body);
    if (body.tilte != '') {
      const result = this.roleService.update({ _id: body._id }, body);
      if (result) {
        this.toolsService.success(res, `/${Config.adminPath}/role`);
      } else {
        this.toolsService.error(res, '增加失败', `/${Config.adminPath}/role`);
      }
    } else {
      this.toolsService.error(res, '标题不能为空', `/${Config.adminPath}/role`);
    }
  }
  @Get('delete')
  async delete(@Query() query, @Response() res) {
    const result = await this.roleService.delete({ _id: query.id });
    console.log(result);
    this.toolsService.success(res, `/${Config.adminPath}/role`);
  }
}
