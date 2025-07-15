import React, { useEffect, useState } from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import MovieItem from "./MovieItem";
import { Movie } from "../types";

interface PaginatedMovieListProps {
    movies: Movie[];
    itemsPerPage: number;
    onMovieClick: (movie: Movie) => void;
    resetPage: boolean;
}

const MovieList: React.FC<PaginatedMovieListProps> = ({
    movies,
    itemsPerPage,
    onMovieClick,
    resetPage,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(movies.length / itemsPerPage);
    const currentMovies = movies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [resetPage]);

    return (
        <>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                {currentMovies.map((movie, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <MovieItem movie={movie} onClick={onMovieClick} />
                    </Grid>
                ))}
            </Grid>
            {totalPages > 1 && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        mt: 2,
                        mb: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={currentPage <= 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        sx={{ minWidth: 120 }}
                    >
                        anterior
                    </Button>
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: "medium", color: "text.primary" }}
                    >
                        página {currentPage} de {totalPages}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={currentPage >= totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        sx={{ minWidth: 120 }}
                    >
                        próxima
                    </Button>
                </Box>
            )}
        </>
    );
};

export default MovieList;
