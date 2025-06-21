export const formatError = (error: any) => {
  const baseResponse: any = {
    message: error.message || "Something went wrong",
    success: false,
    error: {
      name: error.name || "Error",
    },
  };

  // Handle Mongoose validation errors
  if (error.name === "ValidationError" && error.errors) {
    const formattedErrors: Record<string, any> = {};

    for (const key in error.errors) {
      const err = error.errors[key];

      formattedErrors[key] = {
        message: err.message,
        name: err.name,
        properties: err.properties,
        kind: err.kind,
        path: err.path,
        value: err.value,
      };
    }

    baseResponse.message = "Validation failed";
    baseResponse.error.errors = formattedErrors;
  }

  // Handle any nested `errors` field in other error types
  else if (error.errors && typeof error.errors === "object") {
    baseResponse.error.errors = error.errors;
  }

  return baseResponse;
};
