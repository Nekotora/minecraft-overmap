import { Column, Table, Model } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

@Table
export class Type extends Model<Type> {
  @Column({
    type: DataType.STRING
  })
  name: string;
}