module.exports = class ApiError extends Error {
  constructor(statusCode = 500, message) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
};
