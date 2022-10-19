class MapperResponse {
  static cleanDataDb(res) {
    const { deletedAt, updatedAt, ...clean } = res.dataValues;
    return clean;
  }
}
module.exports = MapperResponse;
