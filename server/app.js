import express from "express";
import cors from "cors";
import fs from "fs/promises";
// import Razorpay from "razorpay";

const app = express();
const port = 5005;

app.use(express.json());
app.use(cors());

app.post(`/savedata`, async (req, res) => {
    try {
        async function saveUserData() {
            let { firstname, email, gender, phone, psd, course } = req.body;

            let fileData = await fs.readFile('data.json');
            fileData = JSON.parse(fileData);

            let userData = {
                firstname,
                email,
                gender,
                phone,
                psd,
                course
            }

            fileData.push(userData);
            await fs.writeFile('data.json', JSON.stringify(fileData));
        }

        saveUserData();

        res.status(200).json({
            success: true
        })
        
    } catch (error) {
        console.error(error);
    }
})

// razor pay payment route

// app.post(`/pay`, async (req, res) => {
//     try {
//         async function pay() {

//             let amount;
//             amount = req.body.amount

//             var instance = new Razorpay({
//                 key_id: `rzp_test_yZ0fUpgIh9QxTg`,
//                 key_secret: `8wTwXbsqYgdE5R8MSUN0Jr35`
//             })

//             let order = await instance.orders.create({
//                 amount: amount * 100,
//                 currency: "INR",
//                 receipt: "receipt#1"
//             })

//             res.status(201).json({
//                 success: true,
//                 order,
//                 amount
//             })
//         }
//         pay();
//     } catch (error) {
//         console.error(error);
//     }
// })

app.listen(port, () => {
    console.log(`Server is live at port:`,port);
})