import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, User } from 'lucide-react';
import { mockVideos } from '../../infrastructure/data/mockVideos';
import { VideoCard } from '../components/VideoCard';

export function VideoPlayerPage() {
    const { id } = useParams();
    const video = mockVideos.find(v => v.id === id) || mockVideos[0];

    // Recommendations (excluding current video)
    const relatedVideos = mockVideos.filter(v => v.id !== video.id);

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
                {/* Video Player Placeholder */}
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative group">
                    <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                        </div>
                    </div>
                </div>

                {/* Video Info */}
                <div className="mt-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white line-clamp-2">
                        {video.title}
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 gap-4">
                        {/* Channel Info */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.channelName}`}
                                    alt={video.channelName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {video.channelName}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    1.2M subscribers
                                </p>
                            </div>
                            <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full font-medium hover:opacity-80 transition-opacity ml-4">
                                Subscribe
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                            <div className="flex items-center bg-gray-100 dark:bg-zinc-800 rounded-full">
                                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-l-full border-r border-gray-300 dark:border-zinc-700 transition-colors">
                                    <ThumbsUp className="w-5 h-5" />
                                    <span className="font-medium text-sm">{video.likes}</span>
                                </button>
                                <button className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-r-full transition-colors">
                                    <ThumbsDown className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                                <Share2 className="w-5 h-5" />
                                <span className="font-medium text-sm">Share</span>
                            </button>
                            <button className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4 bg-gray-100 dark:bg-zinc-800 rounded-xl p-4 text-sm">
                        <div className="flex gap-2 font-medium mb-2">
                            <span>{video.views.toLocaleString()} views</span>
                            <span>{video.uploadDate}</span>
                        </div>
                        <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4">Comments</h3>
                        <div className="flex gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                                Y
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="w-full border-b border-gray-300 dark:border-zinc-700 bg-transparent py-1 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button className="px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 font-medium text-sm">
                                        Cancel
                                    </button>
                                    <button className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-gray-400 rounded-full font-medium text-sm" disabled>
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mock Comments */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-700 flex-shrink-0 flex items-center justify-center">
                                    <User className="w-6 h-6 text-gray-500" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm">User {i}</span>
                                        <span className="text-xs text-gray-500">2 days ago</span>
                                    </div>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        Great video! Really enjoyed the content. Keep it up!
                                    </p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <button className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                                            <ThumbsUp className="w-4 h-4" /> 12
                                        </button>
                                        <button className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                                            <ThumbsDown className="w-4 h-4" />
                                        </button>
                                        <button className="text-xs font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-1 rounded-full">
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar / Recommendations */}
            <div className="lg:w-[350px] xl:w-[400px] flex-shrink-0">
                <h3 className="font-bold text-lg mb-4 hidden lg:block">Up Next</h3>
                <div className="flex flex-col gap-3">
                    {relatedVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    );
}
