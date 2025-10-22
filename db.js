const mongoose=require("mongoose");
const getStartDb=(async ()=>{
    mongoose.connect('mongodb://localhost:27017/products').then(()=>{
        console.log("DB connected");
    }).catch((error)=>{
        console.log(`DB error: ${error}`);
    })
});
module.exports={getStartDb}; 




// const mongoose=require("mongoose");
// const getStartDb=(async ()=>{
//     mongoose.connect('mongodb+srv://chathruknasathvathu_db_user:CJUhJFLbNph6BM0z@cluster0.awuza5b.mongodb.net/',{
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(()=>{
//         console.log("DB connected");
//     }).catch((error)=>{
//         console.log(`DB error: ${error}`);
//     })
// });
// module.exports={getStartDb}; 