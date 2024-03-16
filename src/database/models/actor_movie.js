module.exports = (sequelize, DataTypes) => {

    const alias = "Actor_movie";
    const cols = {
        id: {
            primaryKey: true,
            type:DataTypes.INTEGER,
            allowNull: false,
            unsigned: true,
            autoIncrement: true
        },
        actor_id: {
            unsigned: true,
            allowNull: false,
            type:DataTypes.INTEGER
        },
        movie_id: {
            unsigned: true,
            allowNull: false,
            type:DataTypes.INTEGER,
        }
    };
    const config = {
        tableName: 'Actor_movie', 
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const actorMovie = sequelize.define(alias, cols, config);



    return actorMovie;

}