import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const Route_URL = "/certifications";

export const CertificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCertificationRecord: build.mutation({
      query: (data) => ({
        url: `${Route_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [TagTypes.certification],
    }),
    getCertificationRecords: build.query({
      query: () => ({
        url: `${Route_URL}`,
        method: "GET",
      }),
      providesTags: [TagTypes.certification],
    }),
    updateCertificationRecord: build.mutation({
      query: ({ id, body }) => ({
        url: `${Route_URL}/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: [TagTypes.certification],
    }),
    deleteCertificationRecord: build.mutation({
      query: (id) => ({
        url: `${Route_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.certification],
    }),
  }),
});

export const {
  useAddCertificationRecordMutation,
  useGetCertificationRecordsQuery,
  useUpdateCertificationRecordMutation,
  useDeleteCertificationRecordMutation,
} = CertificationApi;
