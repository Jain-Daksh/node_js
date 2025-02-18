const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo((models.Chat), {
        as: 'chats',
        foreignKey: 'chat_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Message.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    chat_id: {
      type: DataTypes.UUID,
    },
    sender_id: {
      type: DataTypes.UUID,
    },
    receiver_id: {
      type: DataTypes.UUID,
    },
    content: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Message;
};
