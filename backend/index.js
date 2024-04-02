const express = require("express");
const googleSheets = require("./connections/googleSheet");
const { getWords } = require("./controllers/words");
const { addInfo } = require("./controllers/user");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const { id, gender, age, yearsOfEnglish } = req.body;

  try {
    const googleSheetsClient = await googleSheets.initializeGoogleSheets();
    const words = await getWords(googleSheetsClient, spreadsheetId);
    await addInfo(
      id,
      age,
      gender,
      yearsOfEnglish,
      googleSheetsClient,
      spreadsheetId
    );
    res.send(words);
  } catch (error) {
    console.error("Error adding data to Google Sheets:", error);
    res
      .status(500)
      .send("An error occurred while adding data to Google Sheets.");
  }
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Server is running on port 1337");
});
