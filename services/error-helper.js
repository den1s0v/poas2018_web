function responseError(documentName) {
  return function ({ error, response, statusCode, props }) {
    error = (typeof error === 'string') ? new Error(error) : error;
    if (error instanceof Error) {
      if (statusCode) error.statusCode = statusCode;
    } else {
      error = new Error('Server error');
    }
    console.error(error);
    const errorInfo = getErrorInfo(error, documentName);
    response.status(errorInfo.statusCode).json({ error: errorInfo.message, props });
  }
}

function getErrorInfo(error, documentName) {
  if (error.name === 'MongoError' && documentName) {
    switch (error.code) {
      case 121:
        return { message: `Incorrect ${documentName} data for the DB`, statusCode: 500 }
      case 11000:
        return { message: `This ${documentName} has already existed`, statusCode: 500 }
      default:
        return { message: error.message, statusCode: 500 }
    }
  } else {
    return { message: error.message, statusCode: (error.statusCode || 500) }
  }
}

function promiseError(error, statusCode = 500) {
  error = (typeof error === 'string') ? new Error(error) : error;
  if (error instanceof Error) {
    error.statusCode = statusCode;
    return Promise.reject(error);
  } else {
    let e = new Error('Server error');
    e.statusCode = 500;
    return Promise.reject(e);
  }
}

module.exports = {
  responseError,
  promiseError
}