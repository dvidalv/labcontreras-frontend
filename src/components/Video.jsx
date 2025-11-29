import video from "/public/videos/video.mp4";
import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";

function Video({
  width = "100%",
  height = "auto",
  maxHeight = "800px",
  autoplay = true,
  muted = true,
  loop = true,
  poster = null,
  className = "",
  showPlayButton = true,
  ...props
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !autoplay) return;

    const attemptAutoplay = async () => {
      try {
        // Intenta reproducir con sonido primero
        videoElement.muted = false;
        await videoElement.play();
        setIsPlaying(true);
        setIsMuted(false);
      } catch (error) {
        console.log("Autoplay con sonido falló, intentando sin sonido...");
        try {
          // Si falla, intenta sin sonido
          videoElement.muted = true;
          await videoElement.play();
          setIsPlaying(true);
          setIsMuted(true);
        } catch (mutedError) {
          console.log("Autoplay completamente bloqueado:", mutedError);
          setAutoplayFailed(true);
          setIsPlaying(false);
        }
      }
    };

    // Pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(attemptAutoplay, 100);
    return () => clearTimeout(timer);
  }, [autoplay]);

  const handlePlayClick = async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    try {
      if (isPlaying) {
        videoElement.pause();
        setIsPlaying(false);
      } else {
        await videoElement.play();
        setIsPlaying(true);
        setAutoplayFailed(false);
      }
    } catch (error) {
      console.error("Error al reproducir video:", error);
    }
  };

  const handleUnmute = async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.muted = false;
    setIsMuted(false);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "53.98px",
      }}>
      <video
        ref={videoRef}
        width={width}
        height={height}
        controls
        preload="metadata"
        muted={isMuted}
        loop={loop}
        poster={poster}
        className={className}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        playsInline={true}
        {...{
          "webkit-playsinline": "true",
          "x5-playsinline": "true",
          "x5-video-player-type": "h5",
          "x5-video-player-fullscreen": "false",
        }}
        style={{
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

      {/* Botón de play personalizado cuando autoplay falla */}
      {autoplayFailed && showPlayButton && (
        <button
          onClick={handlePlayClick}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            border: "3px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            fontSize: "35px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 15,
            transition: "all 0.3s ease",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(5px)",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
            e.target.style.transform = "translate(-50%, -50%) scale(1.1)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.6)";
            e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            e.target.style.transform = "translate(-50%, -50%) scale(1)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
            e.target.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.4)";
          }}>
          ▶
        </button>
      )}

      {/* Botón para activar sonido cuando está silenciado */}
      {isPlaying && isMuted && (
        <button
          onClick={handleUnmute}
          style={{
            position: "absolute",
            top: "70px", // Ajustado para que no se superponga con el marginTop
            right: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "25px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            zIndex: 20,
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
            e.target.style.transform = "scale(1.05)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            e.target.style.transform = "scale(1)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
          }}>
          🔊 Activar sonido
        </button>
      )}
    </div>
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
  showPlayButton: PropTypes.bool,
};

export default Video;
