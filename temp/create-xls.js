const xlsx = require('xlsx');

function createXLS() {
    const data = [];
    for (let i = 1; i <= 15; i++) {
        data.push({
            "Цена": 100 + i,
            "Название товара": `Товар ${i}`,
            "Количество": 1 + i,
            "Дата покупки": `2024-01-${String(i).padStart(2, '0')}` // Example date increment
        });
    }
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    xlsx.writeFile(workbook, 'sample.xls');
}

createXLS();
