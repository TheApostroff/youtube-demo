import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { mockVideos } from '../../infrastructure/data/mockVideos';

export function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Extract categories from mockVideos
    const categories = ['All', ...Array.from(new Set(mockVideos.map((v) => v.category)))];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
                categories={categories}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col w-full">
                <Header onMenuClick={toggleSidebar} />
                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-900 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700">
                    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
                        <Outlet context={{ isSidebarOpen }} />
                    </div>
                </main>
            </div>
        </div>
    );
}
