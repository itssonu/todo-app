const apiResponse = ({ statusCode, data, error, message }) => {
  return (res) => {
    switch (statusCode) {
      case 200:
        return res
          .status(statusCode)
          .json(successResponse({ data, message, statusCode }));

      case 403:
        return res
          .status(statusCode)
          .json(errorResponse({ error, message, statusCode }));

      default:
        break;
    }
  };
};

const successResponse = ({ data, message, statusCode }) => ({
  data,
  success: true,
  message,
  statusCode,
});

const errorResponse = ({ error, message, statusCode }) => ({
  error,
  success: false,
  message,
  statusCode,
});

export default apiResponse;
