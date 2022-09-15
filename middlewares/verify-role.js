const { response } = require("express");


const isAdminRole = (req, res = response, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: 'Token not verified'
        })
    }

    const {role, name} = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} does not have access to this resource`
        })
    }

    next();
}

module.exports = {
    isAdminRole
}