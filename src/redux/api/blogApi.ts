import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const Route_URL = "/blogs";

export const BlogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBlog: build.mutation({
      query: (data) => ({
        url: Route_URL,
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [TagTypes.blog],
    }),
  }),
});

export const { useAddBlogMutation } = BlogApi;
