import { useAppSelector } from '../store/hooks';
import { selectFavourites } from '../store/github/githubSlice';

function Favourites() {
  const favourites = useAppSelector(selectFavourites);

  return (
    <>
      {favourites.length > 0 ? (
        <section className="flex justify-center pt-10 mx-auto h-screen w-screen">
          <ul className="list-none">
            {favourites.map(favourite => (
              <li key={favourite}>
                <a href={favourite} target="_blank">
                  {favourite}
                </a>
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
