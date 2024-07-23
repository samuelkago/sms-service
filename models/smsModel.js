const mongoose = require("mongoose");

const SmsSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  amountDonated: { type: Number, required: true },
  message: { type: String, required: true },
  status: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sms", SmsSchema);
