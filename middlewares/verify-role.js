const { response } = require("express");

const isOwner = (req, res = response, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: `Token not verified`
        })
    }

    const {id, role, name} = req.user;

    if(id !== req.params.id && role !== 'ADMIN_ROLE'){
        return res.status(403).json({
            msg: `Resource not available for ${name}`
        })
    }

    next();
}


module.exports = {
    isOwner
}