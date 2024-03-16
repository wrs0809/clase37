const db=require("../database/models")
const Op = db.Sequelize.Op

const actorsController={

    list:(req,res)=>{
        db.Actor.findAll()
        .then((actors)=>{
            return res.render("actorsList",{actors:actors})
        })
        },
    detail:(req,res)=>{
        db.Actor.findByPk(req.params.id)
        .then((actors)=>{
            return res.render("actorsDetail",{actors:actors})
        })
        }    

}

module.exports= actorsController;