import { useEffect, useRef, useState } from "react";
import "./VideoModal.css";

function VideoModal({ isOpen, onClose, videoSrc }) {
  const videoRef = useRef(null);
  const modalRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      const video = videoRef.current;
      
      const handleError = (e) => {
        console.error("Error al cargar video:", e);
        console.error("URL del video:", videoSrc);
        setHasError(true);
      };

      const handleLoadedData = () => {
        setHasError(false);
        video.play().catch((error) => {
          console.log("Error al reproducir video:", error);
        });
      };

      video.addEventListener("error", handleError);
      video.addEventListener("loadeddata", handleLoadedData);
      
      // Intentar cargar el video
      video.load();

      return () => {
        video.removeEventListener("error", handleError);
        video.removeEventListener("loadeddata", handleLoadedData);
      };
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen, videoSrc]);

  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-container" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Cerrar video">
          ×
        </button>
        <div className="video-modal-content">
          {hasError ? (
            <div className="video-modal-error">
              <p>Error al cargar el video</p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.5rem", opacity: 0.8 }}>
                Verifica que la URL de Cloudinary sea correcta
              </p>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              autoPlay
              className="video-modal-player"
            >
              Tu navegador no soporta el elemento de video.
            </video>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
