const router = require("express").Router();
const mongoose = require("mongoose");
const Models = require("../../models/index");

const { Officers, Owners } = Models;

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    let officers = await Officers.find(req.body);
    let owners = await Owners.find(req.body);

    const merge = [...officers, ...owners];
    if (merge.length == 0) {
      return res.status(200).json({
        msg: "Invalid account. Please register or try again!",
        result: false,
        type: "warning"
      });
    }

    console.log("MERON");
    console.log(merge);
    res.status(200).json({
      msg: "You logged in!",
      result: true,
      type: "success",
      user: merge[0]
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: err,
      result: false,
      type: "error"
    });
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.json({
      msg: "Logout success!"
    });
  } catch (err) {
    console.log(err);
    res.json({
      err
    });
  }
});

router.get("/user", (req, res) => {
  res.json({ msg: "" });
});

router.post("/signup/sendcode", async (req, res) => {
  try {
    const { code, email } = req.body;
    console.log(req.body);
    if (isEmailExist(email) == true) {
      return res.json({ msg: "Your email is already exist.", result: false });
    }
    console.log(req.body);
    const message = {
      from: "marktomarse@gmail.com", // Sender address
      to: email, // List of recipients
      subject: "Account Verificationn", // Subject line
      text:
        "hello, this is your code account verification from SM CINEMA RESERVATION. \n CODE: " +
        code // Plain text body
    };
    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err);
        res.json({ msg: err, result: false });
      } else {
        console.log(info);
        res.json({ msg: "Your code successfuly send." });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ msg: err, result: false });
  }
});

router.post("/signup/register", async (req, res) => {
  try {
    let newcustomer = new Customers(req.body);
    console.log(newcustomer);
    newcustomer.save();

    res.json({ msg: "You now registered!", user: newcustomer });
  } catch (err) {
    res.json({ msg: err, result: false });
  }
});

async function isEmailExist(email) {
  let customer = await Customers.find({ email: email.toLowerCase() });

  if (customer.length > 0) {
    return true;
  }
  return false;
}

module.exports = router;
