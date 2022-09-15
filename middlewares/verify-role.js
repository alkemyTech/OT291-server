const { response } = require("express");

const isOwner = (req, res = response, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: `Token not verified`
        })
    }

    const {idFromParams} = req.params;
    const {id, role, name} = req.user;

    if(id !== idFromParams && role !== 'ADMIN_ROLE'){
        return res.status(403).json({
            msg: `Resource not available for ${name}`
        })
    }

    next();
}


module.exports = {
    isOwner
}