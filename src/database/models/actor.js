module.exports = (sequelize, DataTypes) => {

    const alias = "Actor"; 
    const cols = { 

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unsigned: true,
            autoIncrement: true
        },
        first_name:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        last_name:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        rating:{
            type: DataTypes.DECIMAL(3,1),
            allowNull: false,
            unique: true,
            unsigned: true, 
        }
    };

    const config = {
        tableName: 'Actors', 
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Actor = sequelize.define(alias, cols, config); 
    
    
    
    Actor.associate= function(models){
    // Actor.hasMany(models.Movie,{
    // as:"Movies",
    // foreignKey:"favorite_movie_id"
    // }),

    Actor.belongsToMany(models.Movie,{
        as:"movies",
        through: "actor_movie",
        foreignKey:"actor_id",
        otherkey: "movie_id",
        timestamps:false,
    })
    }


    return Actor; 
    };