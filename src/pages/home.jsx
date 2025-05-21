import React, { useState, useEffect } from 'react';
import { searchProjects } from '../api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../component/container'
import './css/home.css'



const ProjectList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (location.state?.projects) {
            setProjects(location.state.projects);
            setLoading(false);
        } else {
            (async () => {
                setLoading(true);
                try {
                    const data = await searchProjects();
                    setProjects(data);
                } catch (err) {
                    console.error('Error fetching projects:', err);
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [location.state]);

    return (
        <Container>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="home-list">
                    {projects.map(project => (
                        <li
                            className="home-element"
                            key={project.project_id}
                            onClick={() => navigate(`/project/${project.project_id}`)}
                        >
                            <h3>{project.title}</h3>
                            <img
                                src={`http://88.200.63.148:12345${project.thumbnail}`}
                                alt={project.title}
                            />
                            <div className="card-container">
                                <p><strong>Category:</strong> {project.category}</p>
                                <p><strong>Difficulty:</strong> {project.difficulty}</p>
                                <p><strong>Time:</strong> {project.time_requied} min</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
};

export default ProjectList;