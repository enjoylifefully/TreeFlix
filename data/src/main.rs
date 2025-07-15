use csv::Writer;
use reqwest::Client;
use rust_decimal::Decimal;
use serde::Deserialize;
use std::{error::Error, fs::File, time::Duration};
use tokio::time::sleep;

const API_KEY: &str = include_str!("api_key.env");
const SEARCH_URL: &str = "https://api.themoviedb.org/3/movie/popular";

#[derive(Debug, Deserialize)]
struct Movie {
    title: String,
    vote_average: Decimal,
    release_date: String,
    poster_path: Option<String>,
    overview: String,
}

#[derive(Debug, Deserialize)]
struct ApiResponse {
    results: Vec<Movie>,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let client = Client::new();
    let mut writer = Writer::from_writer(File::create("movies_ptbr.csv")?);

    writer.write_record(["title", "rating", "year", "poster_path", "overview"])?;

    for page in 1..1000 {
        let response = client
            .get(SEARCH_URL)
            .query(&[
                ("api_key", API_KEY),
                ("language", "pt-BR"),
                ("page", &page.to_string()),
            ])
            .send()
            .await?
            .json::<ApiResponse>()
            .await?;

        for movie in response.results {
            if movie.overview.is_empty() {
                continue;
            }
            match (movie.release_date.get(0..4), movie.poster_path) {
                (Some(year), Some(poster_path)) => writer.write_record([
                    movie.title,
                    movie.vote_average.round_dp(1).to_string(),
                    year.to_string(),
                    poster_path,
                    movie.overview,
                ])?,
                _ => continue,
            };
        }

        writer.flush()?;

        sleep(Duration::from_millis(50)).await;
    }

    Ok(())
}
