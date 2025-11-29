import video from "/public/videos/video.mp4";
import PropTypes from "prop-types";

function Video({
  width = "100%",
  height = "auto",
  maxHeight = "800px",
  autoplay = false,
  muted = false,
  loop = false,
  poster = null,
  className = "",
  ...props
}) {
  return (
    <video
      width={width}
      height={height}
      controls
      preload="metadata"
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
      poster={poster}
      className={className}
      style={{
        marginTop: "53.98px",
        maxWidth: "100%",
        maxHeight: maxHeight,
        height: "auto",
        display: "block",
        objectFit: "contain",
      }}
      {...props}>
      {/* Múltiples formatos para mejor compatibilidad */}
      <source src={video} type="video/mp4" />
      <source src={video.replace(".mp4", ".webm")} type="video/webm" />
      <source src={video.replace(".mp4", ".ogg")} type="video/ogg" />

      {/* Fallback para navegadores muy antiguos */}
      <p>
        Tu navegador no soporta el elemento de video.
        <a href={video} download>
          Descarga el video aquí
        </a>
      </p>
    </video>
  );
}

Video.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  maxHeight: PropTypes.string,
  autoplay: PropTypes.bool,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  poster: PropTypes.string,
  className: PropTypes.string,
};

export default Video;
