const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.cli()
  ),
  transports: [new winston.transports.Console()],
});

module.exports = { logger };
