import { Column, Table, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { User } from './User';
import { Type } from './Type';

@Table
export class Point extends Model<Point> {

  @Column({
    type: DataType.STRING
  })
  name: string;

  @Column({
    type: DataType.STRING
  })
  coordinate: string;

  @ForeignKey(() => Type)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false
  })
  typeId: number

  @BelongsTo(() => Type)
  type: Type

  @Column({
    type: DataType.INTEGER(10)
  })
  status: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false
  })
  userId: number

  @BelongsTo(() => User)
  user: User
}