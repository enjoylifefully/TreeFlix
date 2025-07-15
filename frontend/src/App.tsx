import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import SearchForm from "./components/SearchForm";
import MovieList from "./components/MovieList";
import MovieDetailsModal from "./components/MovieDetailsModal";
import { Movie } from "./types";
import { search } from "./utils/api";

const App: React.FC = () => {
    const [q, setQ] = useState<string | null>(null);
    const [prefix, setPrefix] = useState<string | null>(null);
    const [yearMin, setYearMin] = useState<number | null>(null);
    const [yearMax, setYearMax] = useState<number | null>(null);
    const [ratingMin, setRatingMin] = useState<number | null>(null);
    const [ratingMax, setRatingMax] = useState<number | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [resetPage, setResetPage] = useState<boolean>(false);

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    return (
        <Container sx={{ paddingTop: 4 }}>
            <Typography variant="h4" gutterBottom>
                TreeFlix
            </Typography>
            <SearchForm
                q={q}
                setQ={setQ}
                prefix={prefix}
                setPrefix={setPrefix}
                yearMin={yearMin}
                setYearMin={setYearMin}
                yearMax={yearMax}
                setYearMax={setYearMax}
                ratingMin={ratingMin}
                setRatingMin={setRatingMin}
                ratingMax={ratingMax}
                setRatingMax={setRatingMax}
                onSearch={() =>
                    search(
                        q,
                        prefix,
                        yearMin,
                        yearMax,
                        ratingMin,
                        ratingMax,
                        (data) => {
                            setMovies(data);
                            setResetPage((b) => !b);
                        },
                    )
                }
            />

            {movies.length === 0 ? (
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: "center",
                        marginTop: 2,
                        color: "text.secondary",
                    }}
                >
                    nenhum filme encontrado
                </Typography>
            ) : (
                <>
                    <MovieList
                        movies={movies}
                        itemsPerPage={18}
                        onMovieClick={handleMovieClick}
                        resetPage={resetPage}
                    />
                    <MovieDetailsModal
                        open={!!selectedMovie}
                        movie={selectedMovie}
                        onClose={() => setSelectedMovie(null)}
                    />
                </>
            )}
        </Container>
    );
};

export default App;
