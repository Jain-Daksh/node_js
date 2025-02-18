const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Chat extends Model {
    static associate(models) {
    }
  }
  Chat.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    sender_id: {
      type: DataTypes.UUID,
    },
    receiver_id: {
      type: DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'Chat',
    tableName: 'chats',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Chat;
};

