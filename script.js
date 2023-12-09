const mongoose = require('mongoose')
const User = require("./User")

mongoose.connect("mongodb://127.0.0.1:27017/testdb")

//----------------Mongoose basics--------------
// run()

async function run() {
    //Cach 1
    const user = await User.create({ name: "Kyle", age: 26 })
    user.name = "Sally"
    await user.save()

    //Cach 2
    // const user = new User({name: "Kyle", age: 26})
    // await user.save()
    console.log(user)
}

//-----------------Schema Types-------------

// run1()
async function run1() {
    try {
        const user = await User.create({
            name: "Kyle",
            age: 26,
            email: "TEST@test.com",
            hobbies: ["Weight Lifting", "Bowling"],
            address: {
                street: "Main St"
            },
        })
        user.createdAt = 5 //imutable
        await user.save()
        console.log(user)
    } catch (e) {
        console.log(e.message)
        // console.log(e.errors.age)
    }

}
//---------------Query Basics----------------------

// run2()
async function run2() {
    try {
        // const user = await User.exists({name: "Kyle"})
        // const user = await User.where("name").equals("Kyle")
        const user = await User.where("age")
         .gt(12)
        //  .lt(35)
         .where("name")
         .equals("Kyle")
        .populate("bestFriend")
         .limit(1)
        //  .select("age")
      
        console.log(user)
    } catch (e) {
        console.log(e.message)
        // console.log(e.errors.age)
    }

}

//---------------Schema Method/Virtuals----------------------
// run3()
async function run3() {
    try {
    //   const user = await User.findOne({name: "Kyle"})
    //   const user = await User.findByName("Kyle")
    // const user = await User.where().byName("Kyle")
    // const user = await User.find().byName("Kyle")

    const user = await User.findOne({name: "Kyle", email: 'test@test.com'})
      console.log(user)
      console.log(user.namedEmail)
    //   user.sayHi()
    } catch (e) {
        console.log(e.message)
        // console.log(e.errors.age)
    }

}

//-------------Schema Middleware----------------
 run4()
async function run4() {
    try {

    const user = await User.findOne({name: "Kyle", email: 'test@test.com'})
    // console.log(user)
    await user.save()
    console.log(user)

    
    } catch (e) {
        console.log(e.message)
        // console.log(e.errors.age)
    }
}