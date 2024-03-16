module.exports = (sequelize, DataTypes) => {

    const alias = "Movie";
    const cols = {
        id: {
            primaryKey: true,
            type:DataTypes.INTEGER,
            allowNull: false,
            unsigned: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        rating:{
            type: DataTypes.DECIMAL(3,1),
            allowNull: false,
            unsigned: true
        },
        awards:{
            type:DataTypes.INTEGER,
            allowNull: false,
            unsigned: true
        },
        release_date:{
            type:DataTypes.DATE,
            allowNull: false
        },
        length:{
            type: DataTypes.INTEGER
        },
        genre_id:{
            type: DataTypes.INTEGER,
            unsigned: true 
        }
    };
    const config = {
        tableName: 'Movies', 
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Movie = sequelize.define(alias, cols, config);

    Movie.associate= function(models){
        Movie.belongsTo(models.Genre,{
            as:"generos",
            foreignKey:"genre_id"
        }),

        Movie.belongsToMany(models.Actor,{
            as:"actores",
            through: "actor_movie",
            foreignKey:"movie_id",
            otherkey: "actor_id",
            timestamps:false,
        })
    }

    

    return Movie;

}

// Movie.associate= function(models){
    //     Movie.belongsToMany(models.Actor,{
    //         as:"actores",
    //         through: "actor_movie",
    //         foreignKey:"movie_id",
    //         otherkey: "actor_id",
    //         timestamps:false,
    //     })
    //}