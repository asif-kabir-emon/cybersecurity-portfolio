import { ApiError } from "./apiError";

export const catchAsync = (fn: Function) => {
  return async (request: Request) => {
    try {
      return await fn(request);
    } catch (error) {
      console.error("Error in catchAsync:", error);
      return ApiError(500, "Internal Server Error!");
    }
  };
};
