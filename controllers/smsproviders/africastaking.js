// add api keys here

// Initialize the SDK
const AfricasTalking = require("africastalking")(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;

function sendMessage(phone_number, message) {
  return new Promise((resolve, reject) => {
    const options = {
      to: phone_number,
      message: message,
      from: "Filtronic",
    };

    sms
      .send(options)
      .then((response) => {
        console.log(response);
        console.log("SMS sent successfully");
        resolve(response);
      })
      .catch((error) => {
        console.error("Error sending SMS:", error);
        reject(error);
      });
  });
}

// sendMessage("+254792986331", "hey there");

module.exports = {
  sendMessage,
};
