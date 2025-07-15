import { Movie } from "../types";

const buildSearchParams = (
    q: string | null,
    prefix: string | null,
    yearMin: number | null,
    yearMax: number | null,
    ratingMin: number | null,
    ratingMax: number | null,
): Record<string, string> => {
    const searchParams: Record<string, string> = {};
    if (q) searchParams.q = q;
    if (prefix) searchParams.prefix = prefix;
    if (yearMin !== null && yearMax !== null && yearMin === yearMax) {
        searchParams.year = yearMin.toString();
    } else {
        if (yearMin !== null) searchParams.year_min = yearMin.toString();
        if (yearMax !== null) searchParams.year_max = yearMax.toString();
    }
    if (ratingMin !== null && ratingMax !== null && ratingMin === ratingMax) {
        searchParams.rating = ratingMin.toString();
    } else {
        if (ratingMin !== null) searchParams.rating_min = ratingMin.toString();
        if (ratingMax !== null) searchParams.rating_max = ratingMax.toString();
    }
    return searchParams;
};

const fetchMovies = async (
    searchParams: Record<string, string>,
): Promise<Movie[]> => {
    const queryString = new URLSearchParams(searchParams).toString();
    const url = `http://localhost:8000/search?${queryString}`;
    const response = await fetch(url);
    if (!response.ok) {
        const errorText = await response.text().catch(() => "unknown error");
        throw new Error(
            `api error: ${response.status} ${response.statusText} - ${errorText}`,
        );
    }
    return await response.json();
};

export const search = async (
    q: string | null,
    prefix: string | null,
    yearMin: number | null,
    yearMax: number | null,
    ratingMin: number | null,
    ratingMax: number | null,
    setMovies: (movies: Movie[]) => void,
) => {
    try {
        const searchParams = buildSearchParams(
            q,
            prefix,
            yearMin,
            yearMax,
            ratingMin,
            ratingMax,
        );
        const data = await fetchMovies(searchParams);
        setMovies(data);
    } catch (err: any) {
        console.error("search error:", err);
    }
};
