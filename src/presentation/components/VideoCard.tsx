import React, { useState } from 'react';
import type { Video } from '../../core/domain/video';

interface VideoCardProps {
    video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
        if (isDisliked) setIsDisliked(false);
    };

    const handleDislike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDisliked(!isDisliked);
        if (isLiked) setIsLiked(false);
    };

    const formatViews = (views: number) => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        }
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views.toString();
    };

    return (
        <div className="video-card">
            <div className="thumbnail-container">
                <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
            </div>
            <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <p className="channel-name">{video.channelName}</p>
                <div className="video-meta">
                    <span>{formatViews(video.views)} views</span>
                    <span>&bull;</span>
                    <span>{video.uploadDate}</span>
                </div>
                <div className="actions">
                    <button
                        className={`action-btn ${isLiked ? 'active' : ''}`}
                        onClick={handleLike}
                        aria-label="Like"
                    >
                        👍 {isLiked ? video.likes + 1 : video.likes}
                    </button>
                    <button
                        className={`action-btn ${isDisliked ? 'active' : ''}`}
                        onClick={handleDislike}
                        aria-label="Dislike"
                    >
                        👎
                    </button>
                </div>
            </div>
        </div>
    );
};
