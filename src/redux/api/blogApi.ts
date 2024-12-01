import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const Route_URL = "/blogs";

export const BlogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBlog: build.mutation({
      query: (data) => ({
        url: `${Route_URL}`,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [TagTypes.blog],
    }),
    getBlogs: build.query({
      query: () => ({
        url: `${Route_URL}`,
        method: "GET",
      }),
      providesTags: [TagTypes.blog],
    }),

    deleteBlog: build.mutation({
      query: (id) => ({
        url: `${Route_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.blog],
    }),
  }),
});

export const { useAddBlogMutation, useGetBlogsQuery, useDeleteBlogMutation } =
  BlogApi;
