import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const Route_URL = "/experiences";

export const ExperienceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addExperience: build.mutation({
      query: (data) => ({
        url: `${Route_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [TagTypes.experience],
    }),
    getExperiences: build.query({
      query: () => ({
        url: `${Route_URL}`,
        method: "GET",
      }),
      providesTags: [TagTypes.experience],
    }),
    updateExperience: build.mutation({
      query: ({ id, body }) => ({
        url: `${Route_URL}/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: [TagTypes.experience],
    }),
    deleteExperience: build.mutation({
      query: (id) => ({
        url: `${Route_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.experience],
    }),
  }),
});

export const {
  useAddExperienceMutation,
  useGetExperiencesQuery,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = ExperienceApi;
