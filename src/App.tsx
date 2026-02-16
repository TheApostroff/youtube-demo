import { useState, useMemo } from 'react';
import { ThemeProvider } from './presentation/components/ThemeContext';
import { Sidebar } from './presentation/components/Sidebar';
import { SearchBar } from './presentation/components/SearchBar';
import { VideoCard } from './presentation/components/VideoCard';
import { ThemeToggle } from './presentation/components/ThemeToggle';
import { mockVideos } from './infrastructure/data/mockVideos';
import './App.css';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'views' | 'likes'>('views');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const categories = ['All', ...Array.from(new Set(mockVideos.map((v) => v.category)))];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    closeSidebar();
  };

  const filteredAndSortedVideos = useMemo(() => {
    let result = mockVideos;

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((video) => video.category === selectedCategory);
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

    // Sort
    result.sort((a, b) => b[sortBy] - a[sortBy]);

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="app-container">
      <header className={`app-header ${isMobileSearchOpen ? 'search-active' : ''}`}>
        {!isMobileSearchOpen && (
          <div className="logo-area">
            <button
              className="menu-button"
              onClick={toggleSidebar}
              aria-label="Toggle Menu"
            >
              ☰
            </button>
            <h1 className="app-title">YouTube Mini</h1>
          </div>
        )}

        <div className={`search-area ${isMobileSearchOpen ? 'mobile-visible' : ''}`}>
          {isMobileSearchOpen && (
            <button
              className="back-button"
              onClick={() => setIsMobileSearchOpen(false)}
              aria-label="Back"
            >
              ←
            </button>
          )}
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {!isMobileSearchOpen && (
          <div className="actions-area">
            <button
              className="mobile-search-btn"
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label="Search"
            >
              🔍
            </button>
            <div className="sort-controls">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'views' | 'likes')}
                className="sort-select"
              >
                <option value="views">Most Views</option>
                <option value="likes">Most Likes</option>
              </select>
            </div>
            <ThemeToggle />
          </div>
        )}
      </header>

      <div className="main-content">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
        {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
        <main className="video-grid">
          {filteredAndSortedVideos.length > 0 ? (
            filteredAndSortedVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))
          ) : (
            <div className="no-results">No videos found</div>
          )}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
