const { initializeGoogleSheets } = require("../connections/googleSheet");

exports.addResult = async (req, res) => {
  const googleSheets = await initializeGoogleSheets();
  const spreadsheetId = process.env.spreadsheetId;
  const { id, ...rest } = req.body;

  try {
    const words = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: "result!B1:1",
    });
    const columns =
      words.data.values && words.data.values[0] ? words.data.values[0] : [];

    const columnMapping = {};
    columns.forEach((column, index) => {
      columnMapping[column] = index + 2;
    });

    const rowData = [id];
    Object.keys(rest).forEach((key) => {
      if (columnMapping[key]) {
        rowData[columnMapping[key] - 1] = rest[key];
      }
    });

    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range: "result!A2",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [rowData],
      },
    });

    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
