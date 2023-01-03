// HTTP Error Codes
const HTTP_ERROR_CODE_NOT_FOUND = 404;
const HTTP_ERROR_CODE_BAD_REQUEST = 400;
const HTTP_ERROR_CODE_SERVER_ERROR = 500;
const HTTP_ERROR_CODE_FORBIDDEN = 403;
const HTTP_ERROR_CODE_UNATHORIZED = 401;
const HTTP_ERROR_CODE_METHOD_NOT_ALLOWED = 405;
const HTTP_ERROR_CODE_NOT_IMPLEMENTED = 501;

export class DetailMessage {
  code?: string;

  description?: string;
}

export class ApplicationError extends Error {
  public name: string;

  public message: string;

  public description: string;

  public httpCode: number;

  public errorCode: string;

  constructor(
    message: string,
    description: string,
    httpCode: number,
    errorCode: string
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.httpCode = httpCode || 500;
    this.errorCode = errorCode || '';
    this.name = 'ChainCodeError';
    this.description = description || '';

    this.message = JSON.stringify({
      message: this.message,
      httpCode: this.httpCode,
      errorCode: this.errorCode,
      name: this.name,
      description: this.description,
    });
  }
}

// DomainError
const makeError = (message: string) => (
  detail: DetailMessage,
  httpCode?: number
) => {
  return new ApplicationError(
    message,
    detail.description,
    httpCode,
    detail.code
  );
};

export default {
  // HTTP Error Codes
  HTTP_ERROR_CODE_BAD_REQUEST,
  HTTP_ERROR_CODE_SERVER_ERROR,
  HTTP_ERROR_CODE_FORBIDDEN,
  HTTP_ERROR_CODE_UNATHORIZED,
  HTTP_ERROR_CODE_METHOD_NOT_ALLOWED,
  HTTP_ERROR_CODE_NOT_FOUND,
  HTTP_ERROR_CODE_NOT_IMPLEMENTED,
};
