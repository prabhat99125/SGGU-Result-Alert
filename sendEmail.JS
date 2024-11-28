const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config()

function sendEmail(text, resultPDf, allResulDeclar, data, resultlenth) {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: process.env.author,
            pass: process.env.pass
        }
    });
    const receiver = {
        from: process.env.author,
        to: process.env.client,
        subject: `Result :- ${allResulDeclar} - ${data} = ${resultlenth}`,
        // text: "Node js to send file",
        // attachments: [
        //     {
        //         filename: '555.jpg', // Name of the file to be attached
        //         path: path.join(__dirname, '555.jpg') // Full path to the file
        //     }
        // ],
        html: `
        <h1 style="text-align: center; color: #007BFF;">Pepar Decaliretion</h1>
    <p style="margin-left: 5px;">${text}</p>
    <div class="boxs" style="width: 100%;">
        <a href="${resultPDf}">
            <button class="btn"
                style="margin-left:97px;margin-top:67px; padding: 5px 15px; background-color: rgb(33, 33, 33); color: #ffff; border: 2px solid #ffffffb0; border-radius: 10px;">
                <strong>Dowenload Result</strong>
            </button>
        </a>
    </div>
    `
    };
    auth.sendMail(receiver,  (error, emailResponse) => {
        if (error) {
            console.log(error)
        } else {
            // console.log("success!");
            return  "success!"
            
        }
    });
}

module.exports = sendEmail