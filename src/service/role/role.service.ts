import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleInterface } from 'src/interface/role.interface';
@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleModel) {}
  async find(json: RoleInterface, fields?: string) {
    try {
      return await this.roleModel.find(json, fields);
    } catch (error) {
      return [];
    }
  }
  async add(json: RoleInterface) {
    try {
      const role = new this.roleModel(json);
      const result = await role.save();
      return result;
    } catch (error) {
      return null;
    }
  }
  async update(json1: RoleInterface, json2: RoleInterface) {
    try {
      const result = await this.roleModel.updateOne(json1, json2);
      return result;
    } catch (error) {
      return null;
    }
  }
  async delete(json: RoleInterface) {
    try {
      const result = await this.roleModel.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }
}
