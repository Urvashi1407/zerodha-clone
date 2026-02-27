const mongoose = require("mongoose");
const { OrdersSchema } = require("../schemas/OrdersSchema");

const OrdersModel = mongoose.model("Orders", OrdersSchema);

module.exports = { OrdersModel };