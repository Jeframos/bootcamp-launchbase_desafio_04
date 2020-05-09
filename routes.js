const express = require("express")
const routes = express.Router()
const teachersRoute = require("./teachersRoute")

routes.get("/", function(req, res){
    return res.redirect("/teachers")
})

routes.get("/teachers", function(req, res){
    return res.render("teachers/index")
})

routes.get("/teachers/create", function(req, res){
    return res.render("teachers/create")
})

routes.post("/teachers", teachersRoute.post)

module.exports = routes