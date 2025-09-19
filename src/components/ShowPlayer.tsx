import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward, Download, PictureInPicture2 } from 'lucide-react';

interface ShowPlayerProps {
  src: string;
  title?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const ShowPlayer: React.FC<ShowPlayerProps> = ({
  src,
  title = "Video Player",
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  width = "75%",
  height = "400px",
  className = ""
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(muted);
  const [, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [isPiPSupported, setIsPiPSupported] = useState(false);
  const [isInPiP, setIsInPiP] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      
      const mobile = isMobileDevice || (isTouchDevice && isSmallScreen);
      setIsMobile(mobile);
      
      // Check PiP support (only for desktop)
      setIsPiPSupported('pictureInPictureEnabled' in document && !mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const updateBuffered = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    const handlePiPEnter = () => setIsInPiP(true);
    const handlePiPLeave = () => setIsInPiP(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('progress', updateBuffered);
    video.addEventListener('enterpictureinpicture', handlePiPEnter);
    video.addEventListener('leavepictureinpicture', handlePiPLeave);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('progress', updateBuffered);
      video.removeEventListener('enterpictureinpicture', handlePiPEnter);
      video.removeEventListener('leavepictureinpicture', handlePiPLeave);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = title || 'video';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePictureInPicture = async () => {
    if (!videoRef.current || !isPiPSupported) return;

    try {
      if (isInPiP) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error('Failed to toggle Picture-in-Picture:', error);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration ? (buffered / duration) * 100 : 0;

  return (
    <div className="flex justify-center">
      <div 
        className={`relative bg-black rounded-lg overflow-hidden shadow-2xl ${className}`}
        style={{ width, height }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={isMobile}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Loading Overlay - Only show on desktop */}
        {duration === 0 && !isMobile && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {/* Controls Overlay - Only show on desktop */}
        {!isMobile && (
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Title Bar */}
            <div className="absolute top-0 left-0 right-0 p-4">
              <h3 className="text-white text-lg font-semibold truncate">{title}</h3>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={togglePlay}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 transition-all duration-200 transform hover:scale-110 pointer-events-auto"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 stroke-white" />
                ) : (
                  <Play className="w-8 h-8 stroke-white" />
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Progress Bar */}
              <div 
                ref={progressRef}
                className="w-full h-2 bg-gray-600 rounded cursor-pointer mb-4 relative"
                onClick={handleProgressClick}
              >
                {/* Buffered Progress */}
                <div 
                  className="absolute h-full bg-gray-400 rounded"
                  style={{ width: `${bufferedPercentage}%` }}
                />
                {/* Watched Progress */}
                <div 
                  className="absolute h-full bg-red-500 rounded"
                  style={{ width: `${progressPercentage}%` }}
                />
                {/* Progress Handle */}
                <div 
                  className="absolute w-4 h-4 bg-red-500 rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                  style={{ left: `${progressPercentage}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => skip(-10)}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={() => skip(10)}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button onClick={toggleMute} className="text-white hover:text-gray-300">
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 accent-red-500"
                    />
                  </div>

                  {/* Time Display */}
                  <span className="text-white text-sm ml-4">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Settings Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                    
                    {showSettings && (
                      <div className="absolute bottom-8 right-0 bg-black bg-opacity-90 rounded p-2 min-w-36 z-10">
                        {/* Playback Speed */}
                        <div className="text-white text-sm mb-2 border-b border-gray-600 pb-2">Speed</div>
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => changePlaybackRate(rate)}
                            className={`block w-full text-left px-2 py-1 text-sm hover:bg-gray-700 rounded ${
                              playbackRate === rate ? 'text-red-500' : 'text-white'
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                        
                        {/* Download Option */}
                        <div className="border-t border-gray-600 pt-2 mt-2">
                          <button
                            onClick={handleDownload}
                            className="flex items-center w-full text-left px-2 py-1 text-sm hover:bg-gray-700 rounded text-white"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </button>
                        </div>
                        
                        {/* Picture in Picture */}
                        {isPiPSupported && (
                          <div className="mt-1">
                            <button
                              onClick={togglePictureInPicture}
                              className="flex items-center w-full text-left px-2 py-1 text-sm hover:bg-gray-700 rounded text-white"
                            >
                              <PictureInPicture2 className="w-4 h-4 mr-2" />
                              {isInPiP ? 'Exit PiP' : 'Picture in Picture'}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowPlayer;