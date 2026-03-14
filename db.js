// const mongoose=require("mongoose");
// const getStartDb=(async ()=>{
//     mongoose.connect('mongodb://localhost:27017/products').then(()=>{
//         console.log("DB connected");
//     }).catch((error)=>{
//         console.log(`DB error: ${error}`);
//     })
// });
// module.exports={getStartDb}; 



// This is for chathruknansathvathu@gmail.com

const mongoose=require("mongoose");
const getStartDb=(async ()=>{
    mongoose.connect('mongodb+srv://chathruknasathvathu_db_user:CJUhJFLbNph6BM0z@cluster0.awuza5b.mongodb.net/',{
    }).then(()=>{
        console.log("DB connected");
    }).catch((error)=>{
        console.log(`DB error: ${error}`);
    })
});
module.exports={getStartDb}; 


/// This is for vvruchendran141594@gmail.com
// FqU4bNUgNnKDge0B
// vvruchendran141594_db_user


// const mongoose=require("mongoose");
// const getStartDb=(async ()=>{
//     mongoose.connect('mongodb+srv://vvruchendran141594_db_user:FqU4bNUgNnKDge0B@cluster0.pxgfebf.mongodb.net/',{
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(()=>{
//         console.log("DB connected");
//     }).catch((error)=>{
//         console.log(`DB error: ${error}`);
//     })
// });
// module.exports={getStartDb}; 