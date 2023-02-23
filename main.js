const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true })


nightmare
  .goto('https://finance.yahoo.com/gainers')
  .wait('table[class*="W(100%)"]') // Waits for table to render.
  .evaluate(() => {
    const table = document.querySelector('table[class*="W(100%)"]'); // Selects the table.
    const rows = table.querySelectorAll('tr'); // Selects all table rows.
    const thirdStock = rows[3]; // Selects third highest stock.
    const cellData = thirdStock.querySelectorAll('td'); // Querys data from third stock.
    const name = cellData[1].textContent // Selects name.
    const change = cellData[3].textContent // Selects percent change.
    const unix = Math.floor(Date.now() / 1000); // Unix Timestamp
    return { name, change, unix };
  })

    // Opens form and types parsed data, then submits completed form!
    .then(formData => {
        return nightmare
        .goto(' https://tinyurl.com/mtpzcucb')
        .type('input[name="SingleLine"]', formData.name)
        .type('input[name="SingleLine1"]', formData.change)
        .type('input[name="SingleLine2"]', formData.unix)
        .click('button[value="submit"]')
        .wait(2000);
    })
//   .end()
//   .then(url => {
//     console.log(`${url}`)
//     console.log(`Name: ${thirdStockData.name} Change: ${thirdStockData.change} Timestamp: ${thirdStockData.unix}`); 
//   })
.then(() => {
    console.log('form submitted!');
})
  .catch(error => {
    console.error('No data being pulled!', error);
  });