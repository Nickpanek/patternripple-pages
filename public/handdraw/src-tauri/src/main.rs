#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod encoder;
mod project;
mod renderer;

use tauri::{command, Window};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Serialize, Deserialize)]
struct ExportParams {
    format: String,
    width: u32,
    height: u32,
    fps: u32,
}

#[command]
async fn select_svg_file() -> Result<String, String> {
    use tauri::api::dialog::blocking::FileDialogBuilder;

    let file = FileDialogBuilder::new()
        .add_filter("SVG", &["svg"])
        .pick_file();

    match file {
        Some(path) => Ok(path.to_string_lossy().to_string()),
        None => Err("No file selected".to_string()),
    }
}

#[command]
async fn select_audio_file() -> Result<String, String> {
    use tauri::api::dialog::blocking::FileDialogBuilder;

    let file = FileDialogBuilder::new()
        .add_filter("Audio", &["mp3", "wav", "m4a"])
        .pick_file();

    match file {
        Some(path) => Ok(path.to_string_lossy().to_string()),
        None => Err("No file selected".to_string()),
    }
}

#[command]
async fn read_file(path: String) -> Result<String, String> {
    std::fs::read_to_string(path).map_err(|e| e.to_string())
}

#[command]
async fn read_audio_file(path: String) -> Result<String, String> {
    let bytes = std::fs::read(path).map_err(|e| e.to_string())?;
    Ok(base64::encode(&bytes))
}

#[command]
async fn export_video(
    format: String,
    width: u32,
    height: u32,
    fps: u32,
) -> Result<String, String> {
    let params = ExportParams { format, width, height, fps };

    tokio::spawn(async move {
        if let Err(e) = encoder::export_video_async(params).await {
            eprintln!("Export error: {}", e);
        }
    });

    Ok("Export started".to_string())
}

#[command]
async fn get_project_dir() -> Result<PathBuf, String> {
    project::get_project_directory()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            select_svg_file,
            select_audio_file,
            read_file,
            read_audio_file,
            export_video,
            get_project_dir
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
