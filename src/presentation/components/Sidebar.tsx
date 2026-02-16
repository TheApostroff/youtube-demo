import { Home, Compass, PlaySquare, Clock, ThumbsUp } from 'lucide-react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { cn } from '../../shared/utils';

// We can extend this list later
const MAIN_LINKS = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/?category=Explore' },
    { icon: PlaySquare, label: 'Subscriptions', path: '/?category=Subscriptions' },
];

const LIBRARY_LINKS = [
    { icon: Clock, label: 'History', path: '/history' },
    { icon: PlaySquare, label: 'Your Videos', path: '/your-videos' },
    { icon: ThumbsUp, label: 'Liked Videos', path: '/liked' },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    categories?: string[]; // Kept for backward compatibility but we might move to static links
}

export const Sidebar = ({ isOpen, onClose, categories }: SidebarProps) => {
    const [searchParams] = useSearchParams();
    const currentCategory = searchParams.get('category');

    const SidebarItem = ({ icon: Icon, label, path, isActive }: any) => (
        <NavLink
            to={path}
            onClick={() => {
                // If on mobile, close sidebar on click
                if (window.innerWidth < 768) onClose();
            }}
            className={({ isActive: routeActive }) => cn(
                "flex items-center gap-4 px-3 py-2 rounded-lg transition-colors mb-1",
                (isActive || (path === '/' && !currentCategory && routeActive))
                    ? "bg-gray-100 dark:bg-zinc-800 font-medium"
                    : "hover:bg-gray-50 dark:hover:bg-zinc-900"
            )}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className={cn("text-sm truncate transition-opacity duration-300", isOpen ? "opacity-100" : "md:opacity-0 group-hover:md:opacity-100")}>{label}</span>
        </NavLink>
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-zinc-950 overflow-y-auto transition-all duration-300 z-50 border-r border-gray-200 dark:border-zinc-800",
                isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0 md:translate-x-0 md:w-16 md:overflow-hidden hover:md:w-64 group"
            )}>
                <div className="p-3">
                    <div className="mb-4">
                        {MAIN_LINKS.map(link => (
                            <SidebarItem
                                key={link.label}
                                {...link}
                                isActive={link.label === 'Home' ? !currentCategory : currentCategory === link.label}
                            />
                        ))}
                    </div>

                    <div className="border-t border-gray-200 dark:border-zinc-800 my-2 pt-2">
                        <h3 className={cn("px-3 mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 truncate transition-opacity duration-300", isOpen ? "opacity-100" : "md:hidden md:opacity-0 group-hover:md:block group-hover:md:opacity-100")}>
                            You
                        </h3>
                        {LIBRARY_LINKS.map(link => (
                            <SidebarItem key={link.label} {...link} />
                        ))}
                    </div>

                    {/* Categories from props (dynamic) */}
                    {categories && categories.length > 0 && (
                        <div className="border-t border-gray-200 dark:border-zinc-800 my-2 pt-2">
                            <h3 className={cn("px-3 mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 truncate transition-opacity duration-300", isOpen ? "opacity-100" : "md:hidden md:opacity-0 group-hover:md:block group-hover:md:opacity-100")}>
                                Categories
                            </h3>
                            {categories.filter(c => c !== 'All').map(category => (
                                <NavLink
                                    key={category}
                                    to={`/?category=${category}`}
                                    className={cn(
                                        "flex items-center gap-4 px-3 py-2 rounded-lg transition-colors mb-1",
                                        currentCategory === category
                                            ? "bg-gray-100 dark:bg-zinc-800 font-medium"
                                            : "hover:bg-gray-50 dark:hover:bg-zinc-900"
                                    )}
                                >
                                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-800 text-xs flex-shrink-0">
                                        {category[0]}
                                    </div>
                                    <span className={cn("text-sm truncate transition-opacity duration-300", isOpen ? "opacity-100" : "md:opacity-0 group-hover:md:opacity-100")}>{category}</span>
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};
