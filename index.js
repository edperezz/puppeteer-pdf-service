const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const app = express();
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const { html } = req.body;

  if (!html) {
    return res.status(400).send('HTML content is required');
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating PDF');
  }
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
