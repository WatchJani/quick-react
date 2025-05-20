import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../api/api';
import CommentList from '../component/commentList'

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
    <div>
      <h2>{project.title}</h2>
      <img
        src={`http://88.200.63.148:12345${project.thumbnail}`}
        alt={project.title}
        style={{ width: '200px', marginBottom: '10px' }}
      />
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Category:</strong> {project.category}</p>
      <p><strong>Difficulty:</strong> {project.difficulty}</p>
      <p><strong>Time Required:</strong> {project.time_requied} minutes</p>
      <p><strong>Instructions:</strong> {project.instruction}</p>

      <h3>Materials</h3>
      <ul>
        {materials.map(mat => (
          <li key={mat.material_id} style={{ marginBottom: '10px' }}>
            <img
              src={`http://88.200.63.148:12345${mat.icon}`}
              alt={mat.name}
              style={{ width: '80px' }}
            />
            <p><strong>{mat.name}</strong> ({mat.quantity} {mat.unit})</p>
            <p>{mat.description}</p>
            <p>Eco-friendly: {mat.is_ecologically ? 'Yes' : 'No'}</p>
            <p>Sensitive: {mat.is_sensitive ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>

      <h3>Project Images</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        {images.map((img, i) => (
          <img
            key={i}
            src={`http://88.200.63.148:12345${img}`}
            alt={`project-img-${i}`}
            style={{ width: '150px' }}
          />
        ))}
      </div>

      <CommentList projectId={id} />
    </div>
  );
};

export default Project;