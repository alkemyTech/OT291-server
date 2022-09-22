class VerifyType{

    static isId(id){
        return id==parseInt(id)
    }

    static VerifyId(req,res,next){
        const id = req.params.id
        if(!(Boolean(id))){
            res.status(400).send("id value was no privided")
            return
        }
        if(!(VerifyType.isId(id))){
            res.status(400).send("id value was no privided")
            return
        }
        next()
    }
}

module.exports=VerifyType