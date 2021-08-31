import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
//Routers
import NewsRouter from './routers/NewsRouter.js'
import UserRouter from './routers/UserRouter.js'
import RulesRouter from './routers/RulesRouter.js'

const app =express()
const PORT = process.env.PORT || 8800

dotenv.config()
app.use(cors());
app.use(express.json())
app.use(express.static('uploads'));
mongoose.set('useFindAndModify', false);

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/elite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log("DB Connection Successfull"))
.catch((err) => {
  console.error(err);
});

app.use('/api/News',NewsRouter)
app.use('/api/users',UserRouter)
app.use('/api/rules',RulesRouter)

if(process.env.NODE_ENV === "production"){
  app.use(express.static('client/build'))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(PORT,()=>{
    console.log(`server is up on port : ${PORT}`)
})