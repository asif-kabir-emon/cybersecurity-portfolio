// import { ApiError } from "./apiError";

// export const catchAsync = (fn: Function) => {
//   return async (request: Request) => {
//     try {
//       return await fn(request);
//     } catch (error) {
//       console.error("Error in catchAsync:", error);
//       return ApiError(500, "Internal Server Error!");
//     }
//   };
// };

import { ApiError } from "@/utils/apiError";

export const catchAsync = (
  fn: (request: Request, context: any) => Promise<any>,
) => {
  return async (request: Request, context: any) => {
    try {
      return await fn(request, context);
    } catch (error: any) {
      console.error("Error in catchAsync:", error);

      // Return an appropriate error response
      return ApiError(
        error.status || 500,
        error.message || "Internal Server Error!",
      );
    }
  };
};
