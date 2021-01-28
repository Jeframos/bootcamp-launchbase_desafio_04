const express = require("express")
const routes = express.Router()
const teachersRoute = require("./teachersRoute")

routes.get("/", function(req, res){
    return res.redirect("/teachers")
})

routes.get("/teachers", teachersRoute.index)

routes.get("/teachers/create", function(req, res){
    return res.render("teachers/create")
})

routes.get("/teachers/:id", teachersRoute.show)

routes.post("/teachers", teachersRoute.post)

routes.get("/teachers/:id/edit", teachersRoute.edit)

routes.put("/teachers", teachersRoute.put)

routes.delete("/teachers", teachersRoute.delete)

module.exports = routes