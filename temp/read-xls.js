const xlsx = require('xlsx');
const path = require('path');

function readAndLogExcelData(filePath) {
    // Read the workbook
    const workbook = xlsx.readFile(filePath);

    // Assuming you want to read the first sheet
    const firstSheetName = workbook.SheetNames[0]
    console.log(workbook)
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert the worksheet to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Log the JSON data
    console.log(jsonData);
}

const filePath = path.join(__dirname, 'sample.xls');
readAndLogExcelData(filePath);
