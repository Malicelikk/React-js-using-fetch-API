import React, {useState , useEffect} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);  // movies state inde filmleri tutacağız
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoviesHandler();
  }, []);  // run first time component is loaded

  async function fetchMoviesHandler() {    // butona tıklayınca çalışacak fonksiyon
    setIsLoading(true);
    setError(null);
    try {
    const response = await fetch('https://swapi.dev/api/films')

    if (!response.ok) { // response ok değilse throw Error
      throw new Error('Something went wrong!');
    }  

    const data = await response.json();
    
        const transformedMovies = data.results.map((movieData) => {  //  data nın içindeki results array ini maple yeni obje oluştur
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          };
        });

        setMovies(transformedMovies); // yeni objeyi movies state ine at
        setIsLoading(false);  // yüklenme bitti
    } catch (error) {
      setError(error.message);
    }
    
  }

  /*const dummyMovies = [
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ];*/

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
       {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
       {isLoading && error && <p>{error}</p>}
       {isLoading && !error && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
