import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../api/api';
import CommentList from '../component/commentList'
import Container from '../component/container'
import './css/project.css';

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data.project);
        setMaterials(data.materials);
        setImages(data.images);
      } catch (err) {
        console.error('Failed to load project', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p>Loading project...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <Container>
      <div className="project-page">
        <div className="project-banner">
          <div className="banner-image-wrapper">
            <img
              src={`http://88.200.63.148:12345${project.thumbnail}`}
              alt={project.title}
              className="banner-image"
            />
          </div>
          <h2 className="banner-title">{project.title}</h2>
        </div>


        <div className="project-tags">
          <span className="project-tag">{project.category}</span>
          <span className="project-tag">{project.difficulty}</span>
          <span className="project-tag">{project.time_requied} min</span>
        </div>

        <div className="project-description-section">
          <h3>Description</h3>
          <p>{project.description}</p>
        </div>

        <div className="project-instruction-section">
          <h3>Instructions</h3>
          <p>{project.instruction}</p>
        </div>

        <div className="project-materials">
          <h3>Materials</h3>
          <ul>
            {materials.map(mat => (
              <li key={mat.material_id} className="material-item">
                <img
                  src={`http://88.200.63.148:12345${mat.icon}`}
                  alt={mat.name}
                />
                <div className="material-details">
                  <p><strong>{mat.name}</strong> ({mat.quantity} {mat.unit})</p>
                  <p>{mat.description}</p>
                  <p>Eco-friendly: {mat.is_ecologically ? 'Yes' : 'No'}</p>
                  <p>Sensitive: {mat.is_sensitive ? 'Yes' : 'No'}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="project-gallery">
          <h3>Project Images</h3>
          <div className="gallery-slider">
            {images.map((img, i) => (
              <img
                key={i}
                src={`http://88.200.63.148:12345${img}`}
                alt={`project-img-${i}`}
              />
            ))}
          </div>
        </div>

        <CommentList projectId={id} />
      </div>
    </Container>
  );
};

export default Project;