const db=require("../database/models")
const Op = db.Sequelize.Op

const genresController={

    list:(req,res)=>{
        db.Genre.findAll()
        .then((genres)=>{
            return res.render("genresList",{genres:genres})
        })
        },
    detail:(req,res)=>{
        db.Genre.findByPk(req.params.id)
        .then((genre)=>{
            return res.render("genresDetail",{genre:genre})
        })
        }    

}

module.exports= genresController;