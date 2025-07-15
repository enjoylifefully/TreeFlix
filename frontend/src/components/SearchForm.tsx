import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import HoverRating from "./HoverRating";

interface SearchFormProps {
    q: string | null;
    setQ: (value: string | null) => void;
    prefix: string | null;
    setPrefix: (value: string | null) => void;
    yearMin: number | null;
    setYearMin: (value: number | null) => void;
    yearMax: number | null;
    setYearMax: (value: number | null) => void;
    ratingMin: number | null;
    setRatingMin: (value: number | null) => void;
    ratingMax: number | null;
    setRatingMax: (value: number | null) => void;
    onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
    q,
    setQ,
    prefix,
    setPrefix,
    yearMin,
    setYearMin,
    yearMax,
    setYearMax,
    ratingMin,
    setRatingMin,
    ratingMax,
    setRatingMax,
    onSearch,
}) => {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <TextField
                    label="pesquisa"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <TextField
                    label="prefixo"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <TextField
                    label="ano mínimo"
                    type="number"
                    value={yearMin ?? ""}
                    onChange={(e) =>
                        setYearMin(
                            e.target.value ? Number(e.target.value) : null,
                        )
                    }
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <TextField
                    label="ano máximo"
                    type="number"
                    value={yearMax ?? ""}
                    onChange={(e) =>
                        setYearMax(
                            e.target.value ? Number(e.target.value) : null,
                        )
                    }
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <HoverRating
                    name="nota mínima"
                    value={ratingMin ?? 0}
                    onChange={setRatingMin}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <HoverRating
                    name="nota máxima"
                    value={ratingMax ?? 10}
                    onChange={setRatingMax}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Button fullWidth variant="contained" onClick={onSearch}>
                    pesquisar
                </Button>
            </Grid>
        </Grid>
    );
};

export default SearchForm;
