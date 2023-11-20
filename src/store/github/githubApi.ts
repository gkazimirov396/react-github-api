import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { IRepo } from '../../models/repo';
import type { GithubResponse, IUser } from '../../models/user';

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  endpoints: builder => ({
    searchUsers: builder.query<IUser[], string>({
      query: search => ({
        url: `/search/users`,
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (res: GithubResponse) => res.items,
    }),
    getUserRepos: builder.query<IRepo[], string>({
      query: username => `users/${username}/repos`,
    }),
  }),
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
