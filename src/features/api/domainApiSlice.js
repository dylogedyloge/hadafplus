import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const domainApi = createApi({
  reducerPath: 'domainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://6797aa2bc2c861de0c6d964c.mockapi.io' }),
  tagTypes: ['Domain'],
  endpoints: (builder) => ({
    getDomains: builder.query({
      query: () => '/domain',
      providesTags: ['Domain'],
    }),
    addDomain: builder.mutation({
      query: (domain) => ({
        url: '/domain',
        method: 'POST',
        body: domain,
      }),
      invalidatesTags: ['Domain'],
    }),
    updateDomain: builder.mutation({
      query: ({ id, ...domain }) => ({
        url: `/domain/${id}`,
        method: 'PUT',
        body: domain,
      }),
      invalidatesTags: ['Domain'],
    }),
    deleteDomain: builder.mutation({
      query: (id) => ({
        url: `/domain/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Domain'],
    }),
  }),
});

export const {
  useGetDomainsQuery,
  useAddDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} = domainApi;