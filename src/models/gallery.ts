import {sequelize} from '../database/database';
import {DataTypes} from 'sequelize';

export const Gallery = sequelize.define('gallery',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    data: {
        type: DataTypes.STRING(20)
    }
});
