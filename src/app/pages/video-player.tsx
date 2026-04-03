import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  ArrowLeft,
  MessageSquare,
  Settings,
  Subtitles,
  Minimize,
  List,
  X,
  CheckCircle,
} from 'lucide-react';
import { useCourseDetail } from '../hooks/use-courses';
import { useAuth } from '../context/auth-context';
import { getAppT } from '../i18n/app';

interface Episode {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  completed?: boolean;
}

export function VideoPlayer() {
  const { id, chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading, error } = useCourseDetail(id || '');
  const { language } = useAuth();
  const t = getAppT(language);
  const videoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration] = useState('20:52');
  const [showControls, setShowControls] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [previewTime, setPreviewTime] = useState<string | null>(null);
  const [previewPosition, setPreviewPosition] = useState(0);

  // Build episodes from real API sections
  const episodes: Episode[] = (course?.sections || []).flatMap((section, si) =>
    section.lessons.map((lesson, li) => ({
      id: lesson.id,
      number: si * 10 + li + 1,
      title: lesson.title,
      description: section.title,
      duration: lesson.duration,
      thumbnail: course?.thumbnail || '',
      completed: false,
    }))
  );

  const currentEpisodeIndex = episodes.findIndex(ep => ep.id === lessonId);
  const currentEpisode = episodes[currentEpisodeIndex >= 0 ? currentEpisodeIndex : 0];
  const nextEpisode = episodes[(currentEpisodeIndex >= 0 ? currentEpisodeIndex : 0) + 1];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isPlaying && showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleMouseMove = () => {
    setShowControls(true);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const skipBackward = () => {
    const newProgress = Math.max(0, progress - 5);
    setProgress(newProgress);
  };

  const skipForward = () => {
    const newProgress = Math.min(100, progress + 5);
    setProgress(newProgress);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setProgress(pos * 100);
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setPreviewPosition(pos * 100);
    
    // Calculate preview time
    const totalSeconds = 20 * 60 + 52; // 20:52 in seconds
    const previewSeconds = Math.floor(totalSeconds * pos);
    const mins = Math.floor(previewSeconds / 60);
    const secs = previewSeconds % 60;
    setPreviewTime(`${mins}:${secs.toString().padStart(2, '0')}`);
  };

  const handleProgressLeave = () => {
    setPreviewTime(null);
  };

  const playNextEpisode = () => {
    if (nextEpisode) {
      navigate(`/course/${id}/video/${chapterId}/${nextEpisode.id}`);
      setProgress(0);
      setCurrentTime('0:00');
    }
  };

  const selectEpisode = (episodeId: string) => {
    navigate(`/course/${id}/video/${chapterId}/${episodeId}`);
    setShowEpisodes(false);
    setProgress(0);
    setCurrentTime('0:00');
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1a4fd8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <p className="text-white/40 text-sm">ვიდეო ვერ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Video Player Container */}
      <div
        ref={videoRef}
        className="relative w-full h-screen bg-black overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Video Content - Using placeholder image as video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={course.thumbnail}
            alt="Video content"
            className="w-full h-full object-cover"
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Subtitle/Caption */}
          <div className="absolute bottom-32 left-0 right-0 flex justify-center px-8">
            <p className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center max-w-4xl leading-relaxed bg-black/60 px-6 py-3 rounded backdrop-blur-sm">
              "...was to become a professional ticket taker."
            </p>
          </div>
        </div>

        {/* Top Gradient & Back Button */}
        <div
          className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-black/50 to-transparent h-32 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="p-6 flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={() => navigate(`/course/${id}/session`)}
              className="flex items-center gap-3 p-2 pr-4 hover:bg-white/10 rounded transition-all group"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
              <span className="text-white font-semibold hidden md:block">{t.playerBack}</span>
            </button>

            {/* Course Title */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center hidden lg:block">
              <p className="text-white font-bold text-lg">{course.title}</p>
              <p className="text-white/60 text-sm">{t.playerSeason} {chapterId} • {currentEpisode?.title}</p>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded transition-colors" title={t.playerSubtitles}>
                <Subtitles className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded transition-colors" title={t.playerComments}>
                <MessageSquare className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded transition-colors" title={t.playerSettings}>
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Play/Pause Button (when paused or first interaction) */}
        <div 
          onClick={togglePlayPause}
          className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 hover:scale-110 transition-all">
            <Play className="w-10 h-10 md:w-12 md:h-12 text-white ml-1" fill="white" />
          </div>
        </div>

        {/* Episodes Side Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full md:w-[500px] bg-black/95 backdrop-blur-xl transition-transform duration-300 ${
            showEpisodes ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowEpisodes(false)}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <h2 className="text-white text-xl font-bold">{t.playerSeason} {chapterId}</h2>
              </div>
              <button
                onClick={() => setShowEpisodes(false)}
                className="p-2 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Episodes List */}
            <div className="flex-1 overflow-y-auto">
              {episodes.map((episode) => (
                <button
                  key={episode.id}
                  onClick={() => selectEpisode(episode.id)}
                  className={`w-full p-4 border-b border-white/[0.06] hover:bg-white/5 transition-colors text-left ${
                    episode.id === lessonId ? 'bg-white/10' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Episode Number */}
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{episode.number}</span>
                    </div>

                    {/* Episode Thumbnail */}
                    <div className="relative flex-shrink-0 w-40 h-24 bg-white/10 rounded overflow-hidden group">
                      <img
                        src={episode.thumbnail}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </div>
                      {episode.completed && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="w-5 h-5 text-green-500" fill="currentColor" />
                        </div>
                      )}
                    </div>

                    {/* Episode Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold mb-2 line-clamp-1">{episode.title}</h3>
                      <p className="text-white/40 text-sm line-clamp-2 leading-relaxed">
                        {episode.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {/* Progress Bar */}
          <div className="px-6 pt-8 pb-4">
            <div 
              ref={progressBarRef}
              className="relative group cursor-pointer"
              onClick={handleProgressClick}
              onMouseMove={handleProgressHover}
              onMouseLeave={handleProgressLeave}
            >
              {/* Thumbnail Preview */}
              {previewTime && (
                <div
                  className="absolute bottom-full mb-4 -translate-x-1/2 transition-all"
                  style={{ left: `${previewPosition}%` }}
                >
                  <div className="relative">
                    <div className="w-40 h-24 bg-white/10 rounded overflow-hidden shadow-2xl border-2 border-white">
                      <img
                        src={course.thumbnail}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 px-2 py-0.5 bg-black/90 text-white text-xs font-semibold rounded">
                        {previewTime}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Track */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden group-hover:h-1.5 transition-all">
                {/* Played */}
                <div
                  className="h-full bg-[#1a4fd8] rounded-full transition-all relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Thumb */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1a4fd8] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Row */}
          <div className="px-6 pb-6 flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={togglePlayPause}
                className="p-2 hover:bg-white/10 rounded-full transition-all"
                title={isPlaying ? t.playerPause : t.playerPlay}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" fill="white" />
                ) : (
                  <Play className="w-8 h-8 text-white" fill="white" />
                )}
              </button>

              {/* Skip Backward */}
              <button
                onClick={skipBackward}
                className="p-2 hover:bg-white/10 rounded-full transition-all hidden md:block"
                title="Rewind 10s"
              >
                <SkipBack className="w-6 h-6 text-white" />
              </button>

              {/* Skip Forward */}
              <button
                onClick={skipForward}
                className="p-2 hover:bg-white/10 rounded-full transition-all hidden md:block"
                title="Forward 10s"
              >
                <SkipForward className="w-6 h-6 text-white" />
              </button>

              {/* Volume */}
              <div 
                className="relative flex items-center gap-2"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-6 h-6 text-white" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-white" />
                  )}
                </button>

                {/* Volume Slider */}
                <div className={`absolute left-full ml-2 transition-all ${
                  showVolumeSlider ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
                }`}>
                  <div className="bg-black/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setVolume(val);
                        setIsMuted(val === 0);
                      }}
                      className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                    <span className="text-white text-sm font-semibold w-8 text-right">{volume}%</span>
                  </div>
                </div>
              </div>

              {/* Time */}
              <span className="text-white text-sm font-semibold ml-2 hidden md:block">
                {currentTime} / {duration}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Next Episode */}
              {nextEpisode && (
                <button
                  onClick={playNextEpisode}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-all"
                  title={t.playerNext}
                >
                  <SkipForward className="w-5 h-5 text-white" />
                  <span className="text-white text-sm font-semibold hidden lg:block">{t.playerNext}</span>
                </button>
              )}

              {/* Episodes List */}
              <button
                onClick={() => setShowEpisodes(!showEpisodes)}
                className="p-2 hover:bg-white/10 rounded-full transition-all"
                title={t.playerEpisodes}
              >
                <List className="w-6 h-6 text-white" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={handleFullscreen}
                className="p-2 hover:bg-white/10 rounded-full transition-all"
                title={isFullscreen ? t.playerExitFullscreen : t.playerFullscreen}
              >
                {isFullscreen ? (
                  <Minimize className="w-6 h-6 text-white" />
                ) : (
                  <Maximize className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Blueberry Branding (bottom left) */}
        <div
          className={`absolute bottom-24 left-6 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded">
              <span className="text-white font-black text-sm tracking-tight">Blueberry</span>
            </div>
            <div className="text-white/60 text-sm bg-black/60 backdrop-blur-sm px-4 py-2 rounded">
              <span className="font-semibold text-white">{course.title}</span>
              <span className="mx-2 text-white/20">•</span>
              <span>E{currentEpisode?.number} {currentEpisode?.title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}