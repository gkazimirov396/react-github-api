import { type MouseEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addFavourite,
  removeFavourite,
  selectFavourites,
} from '../store/github/githubSlice';

import type { IRepo } from '../models/repo';

function RepoCard({ repo }: { repo: IRepo }) {
  const favourites = useAppSelector(selectFavourites);
  const dispatch = useAppDispatch();

  const [isFavorite, setIsFavorite] = useState(
    favourites.includes(repo.html_url)
  );

  const addToFavourite = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(addFavourite(repo.html_url));
    setIsFavorite(true);
  };

  const removeFromFavourite = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(removeFavourite(repo.html_url));
    setIsFavorite(false);
  };

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>

        {isFavorite ? (
          <button
            className="btn btn-error min-h-8 h-9 mt-2"
            onClick={removeFromFavourite}
          >
            Remove
          </button>
        ) : (
          <button
            className="btn btn-warning min-h-8 h-9 mt-2"
            onClick={addToFavourite}
          >
            Add
          </button>
        )}
      </a>
    </div>
  );
}

export default RepoCard;
