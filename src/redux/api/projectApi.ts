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
        data,
      }),
      invalidatesTags: [TagTypes.project],
    }),
  }),
});

export const { useAddProjectMutation } = ProjectApi;
