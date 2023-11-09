import { useState } from 'react';

import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from '../store/github/githubApi';

import useDebounce from '../hooks/useDebounce';

import RepoCard from '../components/RepoCard';

function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  const debouncedValue = useDebounce(searchValue);

  const {
    data: users,
    isLoading,
    isError,
  } = useSearchUsersQuery(debouncedValue, {
    skip: debouncedValue.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { data: repos, isLoading: isFetchingRepos }] =
    useLazyGetUserReposQuery();

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setSearchValue(username);
    setIsDropdownShown(false);
  };

  return (
    <section className="flex justify-center w-screen h-screen pt-10 mx-auto">
      {isError && (
        <p className="text-center text-error">Something Went Wrong!</p>
      )}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="input input-bordered border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for a Github username..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onInput={() => setIsDropdownShown(true)}
        />

        {isDropdownShown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {users?.map(user => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-500 hover:text-white"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className="container">
          {isFetchingRepos && (
            <p className="text-center">Repos are loading...</p>
          )}

          {repos?.map(repo => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
