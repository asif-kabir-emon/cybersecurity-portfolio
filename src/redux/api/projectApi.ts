import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const Route_URL = "/projects";

export const ProjectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addProject: build.mutation({
      query: (data) => ({
        url: `${Route_URL}`,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [TagTypes.project],
    }),
    getProjects: build.query({
      query: () => ({
        url: `${Route_URL}`,
        method: "GET",
      }),
      providesTags: [TagTypes.project],
    }),
    getProject: build.query({
      query: (id) => ({
        url: `${Route_URL}${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.project],
    }),
    updateProject: build.mutation({
      query: ({ id, body }) => ({
        url: `${Route_URL}/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: [TagTypes.project],
    }),
    deleteProject: build.mutation({
      query: (id) => ({
        url: `${Route_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.project],
    }),
    addProjectImages: build.mutation({
      query: ({ id, body }) => ({
        url: `${Route_URL}/${id}/images`,
        method: "POST",
        contentType: "multipart/form-data",
        data: body,
      }),
      invalidatesTags: [TagTypes.project],
    }),
    deleteProjectImage: build.mutation({
      query: ({ id, body }) => ({
        url: `${Route_URL}/${id}/images`,
        method: "DELETE",
        data: body,
      }),
      invalidatesTags: [TagTypes.project],
    }),
    reorderImages: build.mutation({
      query: ({ id, body }) => ({
        url: `${Route_URL}/${id}/images`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: [TagTypes.project],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAddProjectImagesMutation,
  useDeleteProjectImageMutation,
  useReorderImagesMutation,
} = ProjectApi;
