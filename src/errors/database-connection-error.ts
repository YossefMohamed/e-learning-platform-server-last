export class DatabaseConnectionError extends Error {
  reason = "Failed to connect to database";
  statusCode = 500;
  constructor() {
    super("Error connecting to DB");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
