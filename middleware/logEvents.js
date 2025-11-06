const { format } = require("../node_modules/date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, filename) => {
  const dateTime = `${format(new Date(), "yyyMMdd\tHH:MM:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", filename),
      `\n${logItem}`
    );
  } catch (err) {
    console.log(err);
    // next(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "eventLog.txt");
  next();
};

module.exports = { logEvents, logger };
