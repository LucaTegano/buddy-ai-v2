import { useState, useLayoutEffect, useCallback } from 'react';

// Define types for cross-browser compatibility
interface DocumentWithFullscreen extends Document {
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
  msExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
}

interface HTMLElementWithFullscreen extends HTMLElement {
  msRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
}

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // This function checks the browser's current fullscreen state
  const updateFullscreenStatus = useCallback(() => {
    const doc: DocumentWithFullscreen = document;
    setIsFullscreen(!!(
      doc.fullscreenElement ||
      doc.mozFullScreenElement ||
      doc.webkitFullscreenElement ||
      doc.msFullscreenElement
    ));
  }, []);

  // Effect to listen for changes in fullscreen state (e.g., user pressing ESC)
  useLayoutEffect(() => {
    document.addEventListener('fullscreenchange', updateFullscreenStatus);
    document.addEventListener('webkitfullscreenchange', updateFullscreenStatus);
    document.addEventListener('mozfullscreenchange', updateFullscreenStatus);
    document.addEventListener('MSFullscreenChange', updateFullscreenStatus);

    // Initial check
    updateFullscreenStatus();

    return () => {
      document.removeEventListener('fullscreenchange', updateFullscreenStatus);
      document.removeEventListener('webkitfullscreenchange', updateFullscreenStatus);
      document.removeEventListener('mozfullscreenchange', updateFullscreenStatus);
      document.removeEventListener('MSFullscreenChange', updateFullscreenStatus);
    };
  }, [updateFullscreenStatus]);

  const toggleFullscreen = useCallback(() => {
    const doc: DocumentWithFullscreen = document;
    const element: HTMLElementWithFullscreen = document.documentElement; // Full page

    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.mozCancelFullScreen) { // Firefox
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) { // Chrome, Safari and Opera
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) { // IE/Edge
        doc.msExitFullscreen();
      }
    }
  }, [isFullscreen]);

  return { isFullscreen, toggleFullscreen };
};