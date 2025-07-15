import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Movie } from "../types";

interface MovieDetailsModalProps {
    open: boolean;
    movie: Movie | null;
    onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
    open,
    movie,
    onClose,
}) => {
    if (!movie) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 4,
                    width: "80%",
                    maxWidth: 600,
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body1">{movie.overview}</Typography>
            </Box>
        </Modal>
    );
};

export default MovieDetailsModal;
