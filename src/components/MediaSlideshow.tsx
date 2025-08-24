import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

export interface MediaItem {
    id: string;
    url: string;
    type: 'image' | 'video';
    name: string;
    size: number;
}

interface Props {
    media: MediaItem[];
    className?: string;
}

export const MediaSlideshow = ({ media, className = '' }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [currentIndex, isPlaying]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (showControls) {
            timeoutId = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
        return () => clearTimeout(timeoutId);
    }, [showControls]);

    if (!media || media.length === 0) return null;

    const currentMedia = media[currentIndex];
    const isVideo = currentMedia.type === 'video';

    const nextMedia = () => {
        setCurrentIndex((prev) => (prev + 1) % media.length);
    };

    const prevMedia = () => {
        setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    const togglePlayPause = () => {
        if (!isVideo) return;
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':
                prevMedia();
                break;
            case 'ArrowRight':
                nextMedia();
                break;
            case ' ':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
        }
    };

    return (
        <div 
            ref={containerRef}
            className={`relative bg-black rounded-lg overflow-hidden group ${className} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
            onMouseMove={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Main Media Display */}
            <div className="relative aspect-video">
                {isVideo ? (
                    <video
                        ref={videoRef}
                        src={currentMedia.url}
                        className="w-full h-full object-contain"
                        autoPlay={isPlaying}
                        muted={isMuted}
                        loop
                        onLoadedData={() => {
                            if (videoRef.current) {
                                videoRef.current.currentTime = 0;
                            }
                        }}
                    />
                ) : (
                    <img
                        src={currentMedia.url}
                        alt={currentMedia.name}
                        className="w-full h-full object-contain"
                    />
                )}

                {/* Loading overlay for media switching */}
                <div>
                    <div className="text-white text-sm bg-black bg-opacity-70 px-2 py-1 rounded">
                        {currentIndex + 1} of {media.length}
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            {media.length > 1 && (
                <>
                    <button
                        onClick={prevMedia}
                        className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all ${
                            showControls ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextMedia}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all ${
                            showControls ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Media Controls */}
            <div className={`absolute bottom-4 left-4 right-4 transition-all ${
                showControls ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}>
                <div className="flex items-center justify-between bg-black bg-opacity-70 rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                        {isVideo && (
                            <>
                                <button
                                    onClick={togglePlayPause}
                                    className="text-white hover:text-gray-300 transition-colors"
                                >
                                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                </button>
                                <button
                                    onClick={toggleMute}
                                    className="text-white hover:text-gray-300 transition-colors"
                                >
                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>
                            </>
                        )}
                        <span className="text-white text-sm">
                            {currentMedia.name}
                        </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={toggleFullscreen}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <Maximize2 size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Thumbnail Strip */}
            {media.length > 1 && (
                <div className={`absolute bottom-16 left-4 right-4 transition-all ${
                    showControls ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                    <div className="flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                        {media.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => setCurrentIndex(index)}
                                className={`flex-shrink-0 relative w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                                    index === currentIndex
                                        ? 'border-yellow-400 scale-105'
                                        : 'border-transparent hover:border-gray-400'
                                }`}
                            >
                                {item.type === 'video' ? (
                                    <div className="relative w-full h-full bg-gray-800">
                                        <video
                                            src={item.url}
                                            className="w-full h-full object-cover"
                                            muted
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Play size={12} className="text-white" />
                                        </div>
                                    </div>
                                ) : (
                                    <img
                                        src={item.url}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Media Type Indicator */}
            <div className="absolute top-4 right-4">
                <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {isVideo ? '📹' : '📷'} {currentMedia.type.toUpperCase()}
                </div>
            </div>
        </div>
    );
};