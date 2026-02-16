import { useState } from 'react';
import { Menu, Search, Video, Bell, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { cn } from '../../shared/utils';

interface HeaderProps {
    onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?q=${encodeURIComponent(searchQuery)}`);
            setIsMobileSearchOpen(false);
        } else {
            navigate('/');
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between h-16 px-4">
                {/* Left Section: Logo & Menu */}
                <div className={cn("flex items-center gap-4", isMobileSearchOpen && "hidden md:flex")}>
                    <button
                        onClick={onMenuClick}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                    >
                        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-100" />
                    </button>
                    <Link to="/" className="flex items-center gap-1">
                        <div className="bg-red-600 text-white p-1 rounded-lg">
                            <Video className="w-5 h-5 fill-current" />
                        </div>
                        <span className="text-xl font-bold tracking-tight hidden sm:block">YouTube Mini</span>
                    </Link>
                </div>

                {/* Center Section: Search */}
                <form
                    onSubmit={handleSearch}
                    className={cn(
                        "flex-1 max-w-2xl mx-4",
                        isMobileSearchOpen ? "flex" : "hidden md:flex"
                    )}
                >
                    {isMobileSearchOpen && (
                        <button
                            type="button"
                            onClick={() => setIsMobileSearchOpen(false)}
                            className="mr-2 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full md:hidden"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    )}
                    <div className="relative flex w-full">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 pl-4 pr-10 bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-l-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
                        />
                        <button
                            type="submit"
                            className="px-6 bg-gray-100 dark:bg-zinc-800 border border-l-0 border-gray-300 dark:border-zinc-700 rounded-r-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>
                </form>

                {/* Right Section: Actions */}
                <div className={cn("flex items-center gap-2", isMobileSearchOpen && "hidden md:flex")}>
                    <button
                        onClick={() => setIsMobileSearchOpen(true)}
                        className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
                    >
                        <Search className="w-6 h-6 text-gray-700 dark:text-gray-100" />
                    </button>
                    <button className="hidden sm:block p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
                        <Video className="w-6 h-6 text-gray-700 dark:text-gray-100" />
                    </button>
                    <button className="hidden sm:block p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
                        <Bell className="w-6 h-6 text-gray-700 dark:text-gray-100" />
                    </button>
                    <ThemeToggle />
                    <UserMenu />
                </div>
            </div>
        </header>
    );
};
