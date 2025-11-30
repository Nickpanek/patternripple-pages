use crate::renderer::FrameRenderer;
use std::process::{Command, Stdio};
use std::io::Write;

pub async fn export_video_async(params: crate::ExportParams) -> Result<(), String> {
    let output_path = format!("output_{}.{}", chrono::Utc::now().timestamp(), params.format);

    let codec = match params.format.as_str() {
        "mp4" => ("libx264", "aac"),
        "webm" => ("libvpx-vp9", "libopus"),
        _ => return Err("Unsupported format".to_string()),
    };

    let ffmpeg_args = vec![
        "-f", "rawvideo",
        "-pixel_format", "rgba",
        "-video_size", &format!("{}x{}", params.width, params.height),
        "-framerate", &params.fps.to_string(),
        "-i", "pipe:0",
        "-c:v", codec.0,
        "-pix_fmt", "yuv420p",
        "-preset", "medium",
        "-crf", "23",
        &output_path,
    ];

    let mut child = Command::new("ffmpeg")
        .args(&ffmpeg_args)
        .stdin(Stdio::piped())
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .spawn()
        .map_err(|e| format!("Failed to spawn ffmpeg: {}", e))?;

    let stdin = child.stdin.as_mut().ok_or("Failed to open stdin")?;

    let renderer = FrameRenderer::new(params.width, params.height);
    let total_frames = params.fps * 10; // 10 seconds

    for frame_idx in 0..total_frames {
        let time = frame_idx as f64 / params.fps as f64;
        let frame_data = renderer.render_frame(time)?;
        stdin.write_all(&frame_data).map_err(|e| e.to_string())?;
    }

    drop(stdin);
    child.wait().map_err(|e| e.to_string())?;

    Ok(())
}
