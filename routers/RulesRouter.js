import express from "express";
import {Rules} from '../data/Data.js'
const router = express.Router()

router.get('/',(req,res)=>{
res.send(Rules)
})

router.get('/:rulesId',(req,res)=>{
    const rule = Rules.find((r)=>r.title == req.params.rulesId )
    if(rule){
        res.send(rule)
    }else{
        res.send({message:"RULE NOT FOUND!"})
    }
})

export default router