import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFavourite, selectFavourites } from '../store/github/githubSlice';

function Favourites() {
  const favourites = useAppSelector(selectFavourites);
  const dispatch = useAppDispatch();

  return (
    <>
      {favourites.length > 0 ? (
        <section className="flex justify-center pt-10 mx-auto h-screen w-screen">
          <ul className="list-none">
            {favourites.map(favourite => (
              <li key={favourite} className="flex items-center gap-3">
                <a href={favourite} target="_blank">
                  {favourite}
                </a>

                <button
                  className="btn btn-error btn-sm btn-circle btn-outline"
                  onClick={() => dispatch(removeFavourite(favourite))}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-center mt-4">No items.</p>
      )}
    </>
  );
}

export default Favourites;
