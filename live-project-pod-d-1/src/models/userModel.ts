import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface UserAtribute {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phonenumber: number;
  password: string;
  confirmpassword: string;
  isVerified: boolean;
  avatar: string;
}
export class UserInstance extends Model<UserAtribute> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmpassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
    },
  },
  {
    sequelize: db,
    tableName: 'userTable',
  },
);
