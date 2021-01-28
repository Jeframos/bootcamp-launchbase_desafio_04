const fs = require("fs")
const data = require("./data.json")
const {age, graduation, date} = require("./utils")
const Intl = require("intl")

exports.index = function(req,res){
    return res.render("teachers/index", {teachers: data.teachers})
}

exports.post = function(req,res){
    const keys = Object.keys(req.body)
    
    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill all the fields")
        }
    }

    let {avatar_url, name, birth, educationLevel, typeOfClass, occupationArea} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        name, 
        avatar_url, 
        birth, 
        educationLevel, 
        typeOfClass, 
        occupationArea,
        created_at
    })

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
        if(err) return res.send("Write file error Jeffão!")

        return  res.redirect("/teachers")
    })
    //return res.send(req.body)
}

exports.show = function(req,res){
    const {id} = req.params

    const foundTeachers = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if(!foundTeachers) return res.send("Teacher not found!")

    const teacher_1 = {
        ...foundTeachers,
        age: age(foundTeachers.birth),
        graduation: graduation(foundTeachers.educationLevel),
        learning: foundTeachers.occupationArea.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeachers.created_at)
    }
    return res.render("teachers/show", {teacher: teacher_1})
}

exports.edit = function(req,res){
    const{id} = req.params

    const foundTeachers = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if(!foundTeachers) return res.send("Teacher not found!")

    const teacher_1 = {
        ...foundTeachers,
        birth: date(foundTeachers.birth)
        
    } 

    return res.render("teachers/edit", { teacher: teacher_1 })
}

exports.put = function(req, res){
    const {id} = req.body
    let index = 0

    const foundTeachers = data.teachers.find(function(teacher, foundIndex){
        if(teacher.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundTeachers) return res.send("Teacher not found!")

    const teacher_1 = {
        ...foundTeachers,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher_1

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write File!")
        return res.redirect(`/teachers/${ id }`)
    })
 
}

exports.delete = function(req, res){
    const {id} = req.body
    
    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/teachers")
    })
}