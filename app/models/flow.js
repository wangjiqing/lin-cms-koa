import { Model, Sequelize } from 'sequelize';
import sequelize from '../libs/db';

class Flow extends Model {

}

Flow.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    index: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    art_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    status: {
      type: Sequelize.INTEGER
    }
  },
  {
    // 定义表名
    tableName: 'flow',
    // 定义模型名称
    modelName: 'flow',
    paranoid: true,
    underscored: true,
    // 自动写入时间
    timestamps: true,
    // 重命名时间字段
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    sequelize
  }
);

export { Flow as FlowModel };
