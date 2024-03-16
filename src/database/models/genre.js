module.exports = (sequelize, DataTypes) => {

    const alias = "Genre"; 
    const cols = { 

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unsigned: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        ranking:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            unsigned: true, 
        },
        active: {
            type: DataTypes.TINYINT(1),
            allowNull: false
        }
    };

    const config = {
        tableName: 'Genres', 
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Genre = sequelize.define(alias, cols, config); 
    
    
    
Genre.associate= function(models){
    Genre.hasMany(models.Movie,{
            as:"Movies",
            foreignKey:"genre_id"
        })
    }
    return Genre; 
};