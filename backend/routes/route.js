const { addInfo } = require("../controllers/user");
const { getWords } = require("../controllers/words");
const { addResult } = require("../controllers/result");

const router = require("express").Router();

router
  .post("/add-info", addInfo)
  .get("/get-words", getWords)
  .post("/add-result", addResult);

module.exports = router;
