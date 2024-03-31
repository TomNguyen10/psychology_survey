const { initializeGoogleSheets } = require("../connections/googleSheet");

exports.addResult = async (request, name, googleSheets) => {
  const spreadsheetId = "1n1sCGxwX5STLdbb-VyOUhYPEQGoNbFTjJLED_L-vMJY";

  await googleSheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet3",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[request, name]],
    },
  });
};
