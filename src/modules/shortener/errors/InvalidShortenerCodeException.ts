export class InvalidShortenerCodeException extends Error {
  status = 404;
  message = 'Code not found';
  constructor() {
    super();
    Error.captureStackTrace(this);
  }
}
