import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VideoCard } from '../components/VideoCard';
import { mockVideos } from '../../infrastructure/data/mockVideos';

export function HomePage() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const category = searchParams.get('category') || 'All';

    const filteredVideos = useMemo(() => {
        let result = mockVideos;

        // Filter by Category
        if (category !== 'All') {
            result = result.filter((video) => video.category === category);
        }

        // Filter by Search Query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (video) =>
                    video.title.toLowerCase().includes(query) ||
                    video.channelName.toLowerCase().includes(query)
            );
        }

        return result;
    }, [searchQuery, category]);

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                    {searchQuery ? `Results for "${searchQuery}"` : (category === 'All' ? 'Recommended' : category)}
                </h2>
                {/* Sort controls could go here */}
            </div>

            {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {filteredVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <p className="text-lg">No videos found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                </div>
            )}
        </>
    );
}
