const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Sms = require("./models/smsModel");

const { sendMessage } = require("./controllers/smsproviders/africastaking");
const connect = require("./config/db");

connect();

const app = express();
const port = 7000;

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Endpoint to send SMS

app.get("/", (req, res) => {
  res.status(200).json({
    status: "LINTONS FOUNDATION",
  });
});
app.get("/health", (req, res) => {
  const currentTimeStamp = new Date().toISOString();

  res.status(200).json({
    status: "success",
    message: "Sms Server is healthy",
    timestamp: currentTimeStamp,
  });
});

app.post("/send-sms", async (req, res) => {
  const { customerName, phoneNumber, amountDonated } = req.body;

  const message = `Hello ${customerName}, thank you for your donation of ${amountDonated}.`;

  try {
    const response = await sendMessage(phoneNumber, message);

    // Save SMS details to database
    const newSms = new Sms({
      customerName,
      phoneNumber,
      amountDonated,
      message,
      status: "Sent",
    });

    await newSms.save();

    res.status(200).json({ message: "SMS sent and saved to DB", response });
  } catch (error) {
    // Save failed SMS details to database
    const failedSms = new Sms({
      customerName,
      phoneNumber,
      amountDonated,
      message,
      status: "Failed",
    });

    await failedSms.save();

    res.status(500).json({ message: "Error sending SMS", error });
  }
});

app.get("/sms", async (req, res) => {
  try {
    const smsList = await Sms.find();
    res.status(200).json(smsList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving SMS", error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
