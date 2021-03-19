require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
let dateFormat = require("dateformat");
let path = require("path");

app.use(express.static(path.join(__dirname, "./build")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://admin-ehis:" +
    process.env.PASSWORD +
    "@cluster0.5p0bt.mongodb.net/NOC",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.set("useFindAndModify", false);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We're connected to db!");
});

const ticketSchema = new mongoose.Schema({
  nodeA: {
    type: String,
    required: true,
  },
  nodeB: {
    type: String,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  impact: {
    type: String,
    required: false,
  },
  route: {
    type: String,
    required: false,
  },
  timeDown: {
    type: String,
    required: true,
  },
  timeUp: {
    type: String,
    required: false,
  },
  TTR: {
    type: Number,
    required: false,
  },
  RDT: {
    type: Number,
    required: false,
  },
  siteIDWithPowerFailure: {
    type: String,
    required: false,
  },
  COF: {
    type: String,
    required: false,
  },
  action: {
    type: String,
    required: false,
  },
  byWhom: {
    type: String,
    required: true,
  },
  subSystem: {
    type: String,
    required: false,
  },
});

const ticket = mongoose.model("ticket", ticketSchema);

app.get("/failure", function (req, res) {
  res.sendFile(__dirname + "/failure.html");
});

app.post("/getTable", function (req, res) {
  ticket.find({}, function (err, result) {
    if (err) {
      res.send("Could not retrieve data from database " + err);
    } else {
      res.json(result);
    }
  });
});

app.post("/deleteTicket", function (req, res) {
  ticket.findByIdAndDelete(req.body._id, function (err, result) {
    if (err) {
      res.status(400);
    } else {
      if (result) {
        ticket.find({}, function (err, result) {
          if (err) {
            console.log(
              "Could not retrieve data from database after delete action " + err
            );
          } else {
            res.json(result);
          }
        });
      } else {
        res.status(404);
      }
    }
  });
});

app.post("/closeTicket", function (req, res) {
  // const timeUp = req.body.timeUp && req.body.timeUp;
  ticket.findByIdAndUpdate(
    req.body._id,
    {
      timeUp: dateFormat(new Date(), "dd/mmm/yyyy HH:MM"),
    },
    {},
    function (err, result) {
      if (err) {
        res.status(400);
      } else {
        if (!result) {
          res.status(404);
        } else {
          ticket.find({}, function (err, result) {
            if (err) {
              console.log(
                "Could not retrieve data from database after update action " +
                  err
              );
            } else {
              res.json(result);
            }
          });
        }
      }
    }
  );
});

app.post("/registerFailure", function (req, res) {
  const body = req.body;

  const openTicket = new ticket({
    nodeA: body.nodeA,
    nodeB: body.nodeB,
    vendor: body.vendor,
    impact: "NON SERVICE IMPACTING",
    route: "NIL",
    timeDown: dateFormat(body.timeDown, "dd/mmm/yyyy HH:MM"),
    timeUp: "",
    TTR: "",
    RDT: "",
    siteIDWithPowerFailure: body.OFCsiteWithPowerIssue,
    COF: "CAUSE OF FAILURE IS NOT YET KNOWN",
    action:
      body.byWhom.split("-")[0].toUpperCase() +
      "/STH/PWR HD/STATE/TX TAC NOTIFIED TO RESTORE LINK IMMEDIATELY",
    byWhom: body.byWhom,
    subSystem: "FIBER",
  });

  openTicket.save(function (err) {
    if (err) {
      res.send("An error occured while saving ticket");
    } else {
      ticket.find({}, function (err, result) {
        if (err) {
          res.send("Could not retrieve data from database " + err);
        } else {
          res.json(result);
        }
      });
    }
  });
});

app.post("/updateFailure", function (req, res) {
  const body = req.body;
  if (body.timeUp) {
    body.timeUp = dateFormat(body.timeUp, "dd/mmm/yyyy HH:MM");
  }
  ticket.findByIdAndUpdate(
    req.body._id,
    body,
    {
      new: true,
    },
    function (err, update) {
      if (err) {
        console.log("Could not update entry in database " + err);
      }
      ticket.find({}, function (err, result) {
        if (err) {
          res.send(
            "Could not retrieve data from database after update was executed " +
              err
          );
        } else {
          res.json(result);
        }
      });
    }
  );
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}
app.listen(port, function () {
  console.log("Server started at port 3001");
});
