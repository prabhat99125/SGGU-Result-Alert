const request = require('request');
const cheerio = require("cheerio")
const express = require("express");
const sendEmail = require("./email");
const fs = require("fs")
const app = express();
const PORT = process.env.PORT || 4562;
const cron = require("node-cron")
require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")


app.get("/", (req, res) => {

  res.render("index")
})

setInterval(() => {
  getData()
}, 10000);

function getData() {
  request(process.env.LINK, function (error, response, body) {
    readHtml(body)
  });
}
function readHtml(HTML) {
  try {
    const $ = cheerio.load(HTML);
    const li = ($(".list-group-item"));
    const linkText = $(".list-group-item a");
    let allResulDeclar = li.length;

    try {
      fs.readFile("./result.txt", "utf-8", (err, data) => {
        if (err) {
          console.log(err)
        }
        if (allResulDeclar === Number(data)) {
          console.log("no chenging")
        } else {
          let resultlenth = allResulDeclar - Number(data);
          for (let i = 0; i < resultlenth; i++) {
            const resultPDf = process.env.PDFLink + ($(linkText[i]).attr("href"));
            const text = ($(linkText[i]).text());
            fs.writeFile("./result.txt", String(allResulDeclar), (err, data) => { });

            sendEmail(text, resultPDf);
          }
        }

      })
    } catch (error) {
      const resultPDf = "#"
      let text = `ERROR ${now.getHours()}`
      sendEmail(error, resultPDf, text);
    }
  } catch (e) {
    const resultPDf = "#"
    const text = `ERROR`
    sendEmail(e, resultPDf, text);
  }
}
app.listen(PORT, () => { console.log("server started") })