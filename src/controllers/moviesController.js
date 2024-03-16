const db =require("../database/models")
const Op = db.Sequelize.Op

const moviesController={

list:(req,res)=>{
db.Movie.findAll(
    {
        include:[{association:'generos'}]
    }
)
.then((movies)=>{
    return res.render("moviesList",{movies:movies})
})
},
detail:(req,res)=>{
    db.Movie.findByPk(req.params.id)
    .then((movie)=>{
        return res.render("moviesDetail",{movie:movie})
    })
},
new:(req,res)=>{
    db.Movie.findAll({
        order:
            [['release_date','ASC']]
    })
    .then((movies)=>{
        return res.render("newestMovies",{movies:movies})
    })
},
recommended:(req,res)=>{
    db.Movie.findAll(
        {
            where:{
                rating: { [Op.gt]: 5},
                
            },
            limit: 5
        }
        )
    .then((movies)=>{
        return res.render("recommendedMovies",{movies:movies})
    })
},
add:(req,res)=>{
    res.render("addMovie")
},
createMovie:
async (req, res) => {
    try {
        const body = req.body;
        console.log(body);

        const genre = await db.Genre.findOne({
            where: {
                name: req.body.genero
            }
        });

        console.log(genre.id);
        const genreId = genre.id;

        await db.Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: genreId
        });

        res.redirect("/movies");
    } catch (error) {

        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
}
// (req,res)=>{
//     const body = req.body;
//     console.log(body)

//     db.Genre.findOne({
//         where:{
//             name : req.body.genero
//         } 
//     }).then(genre => {
//         console.log(genre.id)
//         const genreId = genre.id 
//         db.Movie.create({
//             title: req.body.title,
//             rating: req.body.rating,
//             awards: req.body.awards,
//             release_date: req.body.release_date,
//             length: req.body.length,
//             genre_id: genreId
//         });
//         res.redirect("/movies")})
// }
,
edit:
    async (req, res) => {
        try {
            const movie = await db.Movie.findByPk(req.params.id,{
                include:[{association:'generos'}]
            })
            const genres = await db.Genre.findAll();

            res.render("editMovie", { movie, genres});
        } catch (error) {
            console.error(error);
            res.status(500).send("Error interno del servidor");
        }

    // db.Movie.findByPk(req.params.id,{
    //            include:[{association:'generos'}]
    //})
    // .then(function(movie){
    //     db.Genre.findAll()
    //     .then(function(genres){
    //         res.render("editMovie", { movie: movie, genres: genres });
    //     })
    // })
},
update:async (req, res) => {
    try {
        const body = req.body;
        const genre = await db.Genre.findOne({
            where: {
                name: req.body.genero
            }
        });
        const genreId = genre.id;

        await db.Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: genreId
        },{
            where: {
                    id : req.params.id
            }
        });

        res.redirect("/movies");
    } catch (error) {

        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
},
// (req,res)=>{
//     const body = req.body;
//     console.log(body)

//     db.Movie.update({
//         title: req.body.title,
//         rating: req.body.rating,
//         awards: req.body.awards,
//         release_date: req.body.release_date,
//         length: req.body.length,
//     },{
//         where: {
//             id: req.params.id
//         }
//     });
//     res.redirect("/movies")
// },
delete: async (req, res) =>{
    try{
        await db.Movie.destroy({
            where: {id: req.params.id}
        })
        res.redirect("/movies")
    } catch (error) {

        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
}
}

// (req,res)=>{
// db.Movie.destroy({
//     where: {id: req.params.id}
// })
// .then(()=>{
// res.redirect("/movies")
// })
// .catch(error => {
// res.send(error)
// })
// }}

// (req,res)=>{
//     db.Actors.update({
//         favorite_movie_id: null
//     },{
//         where: {favorite_movie_id: req.params.id}
//     }).then(() => {
//         db.actorMovie.destroy({
//             where:{movie_id: req.params.id}
//         }).then(() => {
//             return db.Movies.destroy({
//                 where: {id: req.params.id}
//             })
//         })
//     })
//         .then(()=>{
//             res.redirect("/movies")
//         })
//         .catch(error => {
//             res.send(error)
//         })

// }

module.exports= moviesController;