const { initializeGoogleSheets } = require("../connections/googleSheet");

exports.getWords = async (req, res) => {
  try {
    const googleSheets = await initializeGoogleSheets();
    const spreadsheetId = "1n1sCGxwX5STLdbb-VyOUhYPEQGoNbFTjJLED_L-vMJY";
    const words = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: "result!B1:1",
    });

    const values = words.data.values || [];

    const firstRowExceptFirstColumn = values.length > 0 ? values[0] : [];

    for (let i = firstRowExceptFirstColumn.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [firstRowExceptFirstColumn[i], firstRowExceptFirstColumn[j]] = [
        firstRowExceptFirstColumn[j],
        firstRowExceptFirstColumn[i],
      ];
    }

    res.status(200).json(firstRowExceptFirstColumn);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
