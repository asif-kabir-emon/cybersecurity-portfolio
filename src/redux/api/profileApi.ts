import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const Route_URL = "/profiles";

export const ProfileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addProfile: build.mutation({
      query: (data) => ({
        url: `${Route_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [TagTypes.profile],
    }),
    getProfile: build.query({
      query: () => ({
        url: `${Route_URL}`,
        method: "GET",
      }),
      providesTags: [TagTypes.profile],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `${Route_URL}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [TagTypes.profile],
    }),
    deleteProfile: build.mutation({
      query: () => ({
        url: `${Route_URL}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.profile],
    }),
    // Profile Image
    updateProfileImage: build.mutation({
      query: (data) => ({
        url: `${Route_URL}/image`,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [TagTypes.profile],
    }),
    deleteProfileImage: build.mutation({
      query: (id) => ({
        url: `${Route_URL}/image`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.profile],
    }),
  }),
});

export const {
  useAddProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileImageMutation,
  useDeleteProfileImageMutation,
} = ProfileApi;
