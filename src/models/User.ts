import { Column, Table, Model } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { enumWords } from '../helpers/DatabaseHelper';

export enum UserLevel {
  Master = 'master',
  Admin = 'admin',
  User = 'user',
  Disable = 'disable'
}

@Table
export class User extends Model<User> {

  @Column({
    type: DataType.STRING
  })
  email: string;

  @Column({
    type: DataType.STRING
  })
  username: string;

  @Column({
    type: DataType.STRING
  })
  password: string;

  @Column({
    type: DataType.ENUM(enumWords(UserLevel))
  })
  level: UserLevel;

  @Column({
    type: DataType.STRING(10)
  })
  status: string;
}