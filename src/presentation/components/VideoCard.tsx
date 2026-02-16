import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, MoreVertical } from 'lucide-react';
import type { Video } from '../../core/domain/video';
import { cn } from '../../shared/utils';

interface VideoCardProps {
    video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if wrapped in Link
        e.stopPropagation();
        setIsLiked(!isLiked);
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
        <Link to={`/video/${video.id}`} className="group cursor-pointer flex flex-col gap-2 no-underline">
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-zinc-800">
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                    {/* Duration placeholder if not in video object */}
                    12:34
                </div>
            </div>

            {/* Info */}
            <div className="flex gap-3 items-start mt-1">
                {/* Channel Avatar Placeholder */}
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-300 dark:bg-zinc-700 overflow-hidden">
                    {/* We could add an avatar property to Video interface later */}
                    <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.channelName}`}
                        alt={video.channelName}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                        {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 hover:text-gray-900 dark:hover:text-gray-200">
                        {video.channelName}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span>{formatViews(video.views)} views</span>
                        <span className="mx-1">•</span>
                        <span>{video.uploadDate}</span>
                    </div>

                    {/* Like/Dislike Actions (Optional on card, usually on player) - retained from original */}
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={handleLike}
                            className={cn("p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800", isLiked && "text-blue-600")}
                            title="Like"
                        >
                            <ThumbsUp className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
                        </button>
                    </div>
                </div>

                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-opacity">
                    <MoreVertical className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                </button>
            </div>
        </Link>
    );
};
