import React from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Rating,
    Typography,
} from "@mui/material";
import { Movie } from "../types";

interface MovieItemProps {
    movie: Movie;
    onClick: (movie: Movie) => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, onClick }) => {
    return (
        <Card>
            <CardActionArea onClick={() => onClick(movie)}>
                <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    sx={{ objectFit: "cover" }}
                />
                <CardContent>
                    <Typography variant="h5">{movie.title}</Typography>
                    <Typography variant="subtitle1">{movie.year}</Typography>
                    <Typography variant="subtitle1">
                        <Box
                            sx={{
                                width: 200,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Rating
                                value={movie.rating}
                                max={10}
                                precision={0.1}
                                readOnly
                            />
                            <Box sx={{ ml: 2 }}>{movie.rating}</Box>
                        </Box>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default MovieItem;
