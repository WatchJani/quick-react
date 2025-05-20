import React, { useState, useEffect } from 'react';
import { searchProjects } from '../api/api';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['woodworking', 'furniture', 'electronics'];
const MATERIALS = ['pine', 'oak', 'metal'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];



const ProjectList = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [material, setMaterial] = useState('');

    const [showFilters, setShowFilters] = useState(false);

    const fetchData = async (filters = {}) => {
        setLoading(true);
        try {
            const data = await searchProjects(filters);
            setProjects(data);
        } catch (err) {
            console.error('Error loading projects:', err);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        const filters = {};

        if (searchText.trim() !== '') filters.searchText = searchText;
        if (category !== '') filters.category = category;
        if (difficulty !== '') filters.difficulty = difficulty;
        if (material !== '') filters.materialName = material;

        fetchData(filters);
        setShowFilters(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>Projects</h2>

            <div style={{ marginBottom: '10px' }}>
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
                <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <div>
                        <label>Category:</label>
                        <select value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="">All</option>
                            {CATEGORIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Difficulty:</label>
                        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                            <option value="">All</option>
                            {DIFFICULTIES.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Material:</label>
                        <select value={material} onChange={e => setMaterial(e.target.value)}>
                            <option value="">All</option>
                            {MATERIALS.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {projects.map(project => (
                        <li onClick={() => navigate(`/project/${project.project_id}`)} key={project.project_id} style={{ marginBottom: '20px' }}>
                            <h3>{project.title}</h3>
                            <img
                                src={`http://88.200.63.148:12345${project.thumbnail}`}
                                alt={project.title}
                                style={{ width: '150px' }}
                            />
                            <p><strong>Description:</strong> {project.description}</p>
                            <p><strong>Category:</strong> {project.category}</p>
                            <p><strong>Difficulty:</strong> {project.difficulty}</p>
                            <p><strong>Time:</strong> {project.time_requied} min</p>
                            <p><strong>Published:</strong> {project.is_published ? 'Yes' : 'No'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProjectList;