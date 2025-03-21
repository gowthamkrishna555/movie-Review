import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Movie {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  posterUrl?: string;
}

export default function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios.get("/api/movies").then((res) => setMovies(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <div className="border p-4 rounded-lg shadow-md hover:shadow-xl transition">
              {movie.posterUrl && <img src={movie.posterUrl} alt={movie.title} className="w-full h-48 object-cover" />}
              <h2 className="text-xl font-semibold mt-2">{movie.title}</h2>
              <p className="text-gray-600">{movie.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
