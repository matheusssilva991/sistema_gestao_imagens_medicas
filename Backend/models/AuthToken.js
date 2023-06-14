const mongoose = require("mongoose");

const authTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true
    },
    expirationDate: {
      type: Date,
      expires: 3600, // o valor do tempo de vida será definido posteriormente
      default: Date.now,
    }
});

module.exports = authTokenSchema;
