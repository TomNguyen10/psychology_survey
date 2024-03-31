const { initializeGoogleSheets } = require("../connections/googleSheet");

exports.addInfo = async (req, res) => {
  const googleSheets = await initializeGoogleSheets();
  const spreadsheetId = "1n1sCGxwX5STLdbb-VyOUhYPEQGoNbFTjJLED_L-vMJY";
  const { id, age, gender, yearsOfEnglish } = req.body;
  try {
    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range: "users",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[id, gender, age, yearsOfEnglish]],
      },
    });
    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
