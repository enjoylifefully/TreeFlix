use axum::{
    Router,
    extract::{Query, State},
    response::Json,
    routing::get,
};
use csv::ReaderBuilder;
use rayon::prelude::*;
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use std::{
    cmp::Reverse, collections::BTreeMap, fs::File, io, net::SocketAddr, ops::RangeInclusive,
    sync::Arc,
};
use tokio::sync::RwLock;
use tower_http::cors;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Movie {
    title: String,
    rating: Decimal,
    year: u32,
    overview: String,
    poster_path: String,
}

#[derive(Debug, Deserialize)]
struct SearchParams {
    q: Option<String>,
    prefix: Option<String>,
    year: Option<u32>,
    year_min: Option<u32>,
    year_max: Option<u32>,
    rating: Option<Decimal>,
    rating_min: Option<Decimal>,
    rating_max: Option<Decimal>,
}

#[derive(Clone)]
struct AppState {
    titles: Arc<RwLock<BTreeMap<String, Movie>>>,
}

fn load_movies() -> io::Result<BTreeMap<String, Movie>> {
    let file = File::open("../data/movies_ptbr.csv")?;

    let reader = ReaderBuilder::new()
        .has_headers(true)
        .from_reader(file)
        .into_deserialize::<Movie>();

    let mut map = BTreeMap::new();

    for result in reader {
        let movie = result.map_err(|err| io::Error::new(io::ErrorKind::InvalidData, err))?;
        map.insert(movie.title.to_ascii_lowercase(), movie);
    }

    Ok(map)
}

fn get_prefix_range(prefix: &str) -> RangeInclusive<String> {
    let mut upper_bound = prefix.to_string();
    upper_bound.push(char::MAX);
    prefix.to_string()..=upper_bound
}

async fn search_movies(
    State(state): State<AppState>,
    Query(params): Query<SearchParams>,
) -> Json<Vec<Movie>> {
    let titles = state.titles.read().await;
    let prefix = params.prefix.unwrap_or_default();
    let prefix_range = get_prefix_range(&prefix);
    let query = params.q.map(|q| q.to_lowercase());

    let mut results: Vec<Movie> = titles
        .range(prefix_range)
        .par_bridge()
        .filter_map(|(title, movie)| {
            (params.year.is_none_or(|year| movie.year == year)
                && params.year_min.is_none_or(|min| movie.year >= min)
                && params.year_max.is_none_or(|max| movie.year <= max)
                && params.rating.is_none_or(|rating| movie.rating == rating)
                && params.rating_min.is_none_or(|min| movie.rating >= min)
                && params.rating_max.is_none_or(|max| movie.rating <= max)
                && query.as_ref().is_none_or(|q| title.contains(q)))
            .then_some(movie)
        })
        .cloned()
        .collect::<Vec<Movie>>();

    results.par_sort_by_key(|movie| Reverse(movie.rating));

    Json(results)
}

#[tokio::main]
async fn main() {
    let initial = load_movies().unwrap_or_else(|err| {
        eprintln!("failed to load movies: {err}");
        BTreeMap::new()
    });

    let state = AppState {
        titles: Arc::new(RwLock::new(initial)),
    };

    let cors = cors::CorsLayer::new()
        .allow_origin(cors::Any)
        .allow_methods([axum::http::Method::GET])
        .allow_headers(cors::Any);

    let app = Router::new()
        .route("/search", get(search_movies))
        .with_state(state)
        .layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], 8000));
    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .unwrap_or_else(|err| {
            eprintln!("failed to bind to address {addr}: {err}");
            std::process::exit(1);
        });

    println!("server listening on {addr}");

    axum::serve(listener, app).await.unwrap_or_else(|err| {
        eprintln!("server error: {err}");
        std::process::exit(1);
    });
}
