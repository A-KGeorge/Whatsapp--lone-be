import app from "./app.js";
import logger from "./configs/logger.config.js";

//env variables
const PORT = process.env.PORT || 8000;

let server;

server = app.listen(PORT, () => {
  logger.info(`server is listening at ${PORT}...`);
  logger.info(`pid is ${process.pid}`);
});

//handle server errors

const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  if (error && error.message) {
    logger.error(error.message);
  } else {
    logger.error("An unknown error occurred");
  }
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  }
});
