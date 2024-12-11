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
    getProfiles: build.query({
      query: () => ({
        url: `${Route_URL}`,
        method: "GET",
      }),
      providesTags: [TagTypes.profile],
    }),
    getProfile: build.query({
      query: (id: string) => ({
        url: `${Route_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.profile],
    }),
    updateProfile: build.mutation({
      query: ({ id, body }) => ({
        url: `${Route_URL}/${id}`,
        method: "PATCH",
        contentType: "multipart/form-data",
        data: body,
      }),
      invalidatesTags: [TagTypes.profile],
    }),
    deleteProfile: build.mutation({
      query: (id) => ({
        url: `${Route_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.profile],
    }),
    // Profile Image
    updateProfileImage: build.mutation({
      query: ({ id, body }) => ({
        url: `${Route_URL}/${id}/image`,
        method: "POST",
        contentType: "multipart/form-data",
        data: body,
      }),
      invalidatesTags: [TagTypes.profile],
    }),
    deleteProfileImage: build.mutation({
      query: (id) => ({
        url: `${Route_URL}/${id}/image`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.profile],
    }),
  }),
});

export const {
  useAddProfileMutation,
  useGetProfilesQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileImageMutation,
  useDeleteProfileImageMutation,
} = ProfileApi;
