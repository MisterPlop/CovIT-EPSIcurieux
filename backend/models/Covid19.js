import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Covid19 = sequelize.define("Covid19", {
  date_reported: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
    allowNull: false,
  },
  confirmed_cases: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deaths_reported: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recovered_cases: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  active_cases: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  new_cases: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  new_deaths: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  new_recovered: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deaths_per_100_cases: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  recovered_per_100_cases: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: "covid19",
  timestamps: false,
});

export default Covid19;
