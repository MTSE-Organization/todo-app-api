import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table
} from 'sequelize-typescript';
import { Auditable } from './auditable.model';
import { Account } from './account.model';

@Table({
  tableName: 'db_todo',
  timestamps: true
})
export class Todos extends Auditable {
  @Column({ allowNull: false, type: DataType.STRING })
  declare title: string;

  @Column({ type: DataType.TEXT })
  declare description: string;

  @Column({ allowNull: false, type: DataType.DATE })
  declare dueDate: Date;

  @ForeignKey(() => Account)
  @Column({ allowNull: false, type: DataType.BIGINT })
  declare accountId: bigint;

  @BelongsTo(() => Account)
  declare account: Account;
}
