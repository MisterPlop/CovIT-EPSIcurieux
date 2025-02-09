import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Covid19 = sequelize.define(
  "Covid19",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date_reported: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    confirmed_cases: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    deaths_reported: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    recovered_cases: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    active_cases: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    new_cases: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    new_deaths: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    new_recovered: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    deaths_per_100_cases: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    recovered_per_100_cases: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "covid19", 
    timestamps: false,
  }
);

export default Covid19; 
