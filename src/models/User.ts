import { Column, Table, Model } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {

  @Column({
    type: DataType.STRING
  })
  username: string;

  @Column({
    type: DataType.STRING
  })
  password: string;

  @Column({
    type: DataType.INTEGER(10)
  })
  level: number;

  @Column({
    type: DataType.STRING(10)
  })
  status: string;
}