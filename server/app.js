import express from "express";
import cors from "cors";
import fs from "fs/promises";

const app = express();
const port = 5005;

app.use(express.json());
app.use(cors());

app.post(`/testing`, (req, res) => {
    // res.status(200).json({success:"testing success"})
    try {
        console.log(req.body);
        res.status(200).json({ success: "testing success" });
        async function cheku() {
            let { firstname, lastname, email, gender, phone, psd } = req.body;

            let fileData = await fs.readFile('data.json');
            fileData = JSON.parse(fileData);

            let userData = {
                firstname,
                lastname,
                email,
                gender,
                phone,
                psd
            }

            console.log(userData);
            fileData.push(userData);
            await fs.writeFile('data.json', JSON.stringify(fileData));
            // alert("Data saved successfully!"); send karna hai
        }
        cheku();
    } catch (error) {
        console.error(error);
    }
})

app.listen(port, () => {
    console.log(`Server is live at`, port);
})