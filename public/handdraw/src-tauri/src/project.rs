use std::path::PathBuf;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Project {
    pub version: u32,
    pub name: String,
    pub assets: Vec<Asset>,
    pub timeline: Vec<Segment>,
}

#[derive(Serialize, Deserialize)]
pub struct Asset {
    pub id: String,
    pub asset_type: String,
    pub path: String,
}

#[derive(Serialize, Deserialize)]
pub struct Segment {
    pub id: String,
    pub path_id: String,
    pub start_time: f64,
    pub duration: f64,
    pub easing: String,
}

pub fn get_project_directory() -> Result<PathBuf, String> {
    let base = if cfg!(target_os = "linux") {
        dirs::data_local_dir()
            .ok_or("Failed to get data directory")?
            .join("handdraw")
    } else if cfg!(target_os = "macos") {
        dirs::data_dir()
            .ok_or("Failed to get data directory")?
            .join("HandDraw")
    } else if cfg!(target_os = "windows") {
        dirs::data_dir()
            .ok_or("Failed to get data directory")?
            .join("HandDraw")
    } else {
        return Err("Unsupported platform".to_string());
    };

    std::fs::create_dir_all(&base).map_err(|e| e.to_string())?;
    Ok(base)
}

pub fn save_project(project: &Project, path: PathBuf) -> Result<(), String> {
    let json = serde_json::to_string_pretty(project).map_err(|e| e.to_string())?;
    std::fs::write(path, json).map_err(|e| e.to_string())?;
    Ok(())
}

pub fn load_project(path: PathBuf) -> Result<Project, String> {
    let json = std::fs::read_to_string(path).map_err(|e| e.to_string())?;
    let project: Project = serde_json::from_str(&json).map_err(|e| e.to_string())?;
    Ok(project)
}
