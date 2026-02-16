import React from 'react';

interface SidebarProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
    isOpen,
    onClose,
}) => {
    return (
        <>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <ul className="category-list">
                    {categories.map((category) => (
                        <li
                            key={category}
                            className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => onSelectCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </aside>
            {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
        </>
    );
};
