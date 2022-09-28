class MapperResponse{
    static cleanDataDb(res){
        const {deleteAt,updatedAt,...clean}=res.dataValues
        return clean
    }
}
module.exports=MapperResponse