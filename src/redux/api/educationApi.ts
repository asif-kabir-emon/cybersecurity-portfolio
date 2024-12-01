import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const Route_URL = "/educations";

export const EducationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addEducationRecord: build.mutation({
      query: (data) => ({
        url: `${Route_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [TagTypes.education],
    }),
    getEducationRecords: build.query({
      query: () => ({
        url: `${Route_URL}`,
        method: "GET",
      }),
      providesTags: [TagTypes.education],
    }),
    updateEducationRecord: build.mutation({
      query: ({ id, body }) => ({
        url: `${Route_URL}/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: [TagTypes.education],
    }),
    deleteEducationRecord: build.mutation({
      query: (id) => ({
        url: `${Route_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.education],
    }),
  }),
});

export const {
  useAddEducationRecordMutation,
  useGetEducationRecordsQuery,
  useUpdateEducationRecordMutation,
  useDeleteEducationRecordMutation,
} = EducationApi;
