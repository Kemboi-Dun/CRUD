const req = require('express/lib/request');
const res = require('express/lib/response');
var Userdb = require('../models/model')

//create and save new user
exports.create = (req,res) => {
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
//new user
const user = new Userdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
})

//save user in the database
user
.save(user)
.then(data => {
    // res.send(data)
    res.redirect('/add-user')
})
.catch(err => {
    res.status(500).send({
        message:err.message || "Some error occured while creating a create operation"
    })
})

}


//retrive and return all users/retrive and return a sinle user
exports.find=(req,res)=>{

if(req.query.id){
    const id = req.query.id
    Userdb.findById(id)
    .then(data =>{
        if(!data){
            res.status(404).send({message: "Not found user with Id" +id})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message: "Error retrieving user with Id" +id})
    })

}else{

    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message: err.message|| "Error Ocurred while retrieving user information!"})
    })
}


}

//update a new identified user by user id
exports.update = (req,res) => {
   if(!req.body){
       return res
       .status(400)
       .send({message: "Data to update can not be empty!"})
   } 
   const id = req.params.id
   Userdb.findByIdAndUpdate(id,req.body)
   .then(data => {
       if(!data){
           res.status(404).send({message: "Cannot update user with ${id}, maybe user not found!"})
       }else{
           res.send(data)
       }
   })
   .catch(err => {
       res.status(500).send({message: "Error Update user information!"}) 
   })
}
//delete a user with specified user id in the request
exports.delete = (req,res) => {
    const id = req.params.id

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message : "Can not Delete with Id ${id}, Maybe the entered Id is wrong!"})
        }else{
            res.send({
                message: "User succesfully Deleted!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({message: "Could not Delete user with id= " +id})
    })
}