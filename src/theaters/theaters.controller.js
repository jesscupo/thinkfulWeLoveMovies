const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {   
    let results = await service.list();
    res.json({ data: results });
}

module.exports = {
    list: asyncErrorBoundary(list),
  };
  