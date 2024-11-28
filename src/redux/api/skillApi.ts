import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const Route_URL = "/skills";

export const SkillApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCategory: build.mutation({
      query: (body) => ({
        url: `${Route_URL}/categories`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [TagTypes.skill, TagTypes.skill_category],
    }),
    getCategories: build.query({
      query: () => ({
        url: `${Route_URL}/categories`,
        method: "GET",
      }),
      providesTags: [TagTypes.skill, TagTypes.skill_category],
    }),
    getCategory: build.query({
      query: (id) => ({
        url: `${Route_URL}/categories/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.skill, TagTypes.skill_category],
    }),
    updateCategory: build.mutation({
      query: ({ id, body }) => ({
        url: `${Route_URL}/categories/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: [TagTypes.skill, TagTypes.skill_category],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${Route_URL}/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.skill, TagTypes.skill_category],
    }),
    addSkill: build.mutation({
      query: (body) => ({
        url: `${Route_URL}`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [TagTypes.skill],
    }),
    getSkills: build.query({
      query: () => ({
        url: `${Route_URL}`,
        method: "GET",
      }),
      providesTags: [TagTypes.skill],
    }),
    getSkill: build.query({
      query: (id) => ({
        url: `${Route_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.skill],
    }),
    updateSkill: build.mutation({
      query: ({ id, body }) => ({
        url: `${Route_URL}/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: [TagTypes.skill],
    }),
    deleteSkill: build.mutation({
      query: (id) => ({
        url: `${Route_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.skill],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddSkillMutation,
  useGetSkillsQuery,
  useGetSkillQuery,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = SkillApi;
