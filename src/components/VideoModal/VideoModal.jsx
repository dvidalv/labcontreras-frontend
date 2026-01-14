import { useEffect, useRef } from "react";
import "./VideoModal.css";

function VideoModal({ isOpen, onClose, videoSrc }) {
  const videoRef = useRef(null);
  const modalRef = useRef(null);

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
      videoRef.current.play().catch((error) => {
        console.log("Error al reproducir video:", error);
      });
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-container" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Cerrar video">
          ×
        </button>
        <div className="video-modal-content">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            autoPlay
            className="video-modal-player"
          >
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
