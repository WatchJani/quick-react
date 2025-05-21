import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProjects } from '../api/api';

const CATEGORIES = ['woodworking', 'furniture', 'electronics'];
const MATERIALS = ['pine', 'oak', 'metal'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];

const NavigationBar = () => {
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [material, setMaterial] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const navigate = useNavigate();

    const applyFilters = async () => {
        const filters = {};
        if (searchText.trim()) filters.searchText = searchText;
        if (category) filters.category = category;
        if (difficulty) filters.difficulty = difficulty;
        if (material) filters.materialName = material;

        try {
            const data = await searchProjects(filters);
            navigate('/', { state: { projects: data } });
        } catch (err) {
            console.error('Search failed:', err);
        }
    };

    return (
        <>
            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
                <button onClick={() => setShowFilters(prev => !prev)}>Filters</button>
                <button onClick={applyFilters}>Apply</button>
            </div>

            {showFilters && (
                <div className="filters-box">
                    <div>
                        <label>Category:</label>
                        <select value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="">All</option>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Difficulty:</label>
                        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                            <option value="">All</option>
                            {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Material:</label>
                        <select value={material} onChange={e => setMaterial(e.target.value)}>
                            <option value="">All</option>
                            {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavigationBar;
