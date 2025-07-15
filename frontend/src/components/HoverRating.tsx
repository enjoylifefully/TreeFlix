import React from "react";
import {
    Box,
    FormControl,
    InputLabel,
    Rating,
    Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

function HoverRating({
    name,
    value,
    onChange,
}: {
    name: string;
    value: number;
    onChange: (newValue: number) => void;
}) {
    return (
        <FormControl fullWidth>
            <InputLabel shrink sx={{ bgcolor: "white", pl: 1, pr: 1 }}>
                {name}
            </InputLabel>
            <Box
                sx={{
                    border: "1px solid",
                    borderColor: "grey.400",
                    borderRadius: 1,
                    padding: "12px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Rating
                    value={value}
                    max={10}
                    precision={0.1}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            onChange(newValue as number);
                        }
                    }}
                    size="large"
                    icon={
                        <StarIcon
                            style={{ width: "2.5rem", height: "2.5rem" }}
                        ></StarIcon>
                    }
                    emptyIcon={
                        <StarOutlineIcon
                            style={{ width: "2.5rem", height: "2.5rem" }}
                        ></StarOutlineIcon>
                    }
                    sx={{ userSelect: "none" }}
                />
                <Typography
                    variant="h6"
                    sx={{ color: "rgba(0, 0, 0, 0.6)", ml: 1.5 }}
                >
                    {value}
                </Typography>
            </Box>
        </FormControl>
    );
}

export default HoverRating;
