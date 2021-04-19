const express = require('express')
const router = express.Router()
const Person = require('../Models/personSchema')

//add person @Post
router.post('/newperson', (req,res)=>{
    let newPerson = new Person(req.body)
    newPerson.save((err)=>{
        err ? console.log(err) : res.send('person added')
    })
})

//Create Many Records with model.create()
router.post('/addpersons', (req,res)=>{
    Person.create([{ name: 'mariem',age:18,favoriteFoods:'ananas'},{ name: 'aze',age:18,favoriteFoods:'ananas'}], function (err, small) {
        err ? console.log(err) : res.send('person added')
      });
})

//Get all Person @Get
router.get('/', (req,res)=>{
    Person.find({},(err,data)=>{
        err ? console.log(err) : res.json(data)
    })
})

//Get Person by id @Get
router.get('/:id', (req,res)=>{
    Person.find({_id:req.params.id},(err,data)=>{
        err ? console.log(err) : res.json(data)
    })
})

//findOne By name @Get
router.get('/personbyfood/:favoriteFoods', (req,res)=>{
    Person.findOne({favoriteFoods:req.params.favoriteFoods}, function (err, data) {
        err ? console.log(err) : res.json(data)
    });
})

//Update person by id @Put
router.put('/addfavoritefood/:id',(req,res)=>{
    Person.findByIdAndUpdate({_id:req.params.id},{$push:{favoriteFoods:'hamburger'}}, (err,msg)=>{
        err ? console.log(err) : res.json({msg:"Hamburger was added"})
    })
})

//create many instances of your models 
router.post('/addpersons', (req,res)=>{
    Person.create([{ name: 'mariem',age:18,favoriteFoods:'ananas'},{ name: 'aze',age:18,favoriteFoods:'ananas'}], function (err, small) {
        err ? console.log(err) : res.send('person added')
      });
})

//Delete person by id @Delete
router.delete('/deleteperson/:id', (req,res)=>{
    Person.findByIdAndDelete({_id:req.params.id},(err,msg)=>{
        err ? console.log(err) : res.json({msg:'person deleted'})
    })
})

//Delete many persons with model.remove() @Delete 
router.delete('/deleteMary',(req,res)=> {
    person.remove({name:"Mary"},(err,msg)=> {
        err ? console.log(err) : res.json({msg:"All persons have name Mary were removed"})
    })
})

//Update person by id @Put
router.put('/update/:id',(req,res)=>{
    Person.findByIdAndUpdate({_id:req.params.id},{...req.body}, (err,msg)=>{
        err ? console.log(err) : res.json({msg:msg})
    })
})

//Perform New Updates on a Document Using model.findOneAndUpdate() @PUT 
router.put('/updateage/:name', (req,res)=> {
    person.findOneAndUpdate({name:req.params.name},{$set:{age:20}},{ new: true } ,(err,msg)=>{
        err ? console.log(err) : res.json({msg:'Age updated'})
    })
})
//Chain Search Query Helpers to Narrow Search Results @Get
router.get('/search/burrito', (req,res)=>{
    Person.find({favoriteFoods:"burrito"})                   // find all users
            .limit(2)                // limit to 10 items
            .sort({name:1})     // sort ascending by firstName
            .select({name: true,favoriteFoods:true}) // select firstName only
            .exec()                   // execute the query
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                console.error(err)
            })
})

module.exports = router