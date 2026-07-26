import { PROJECTS } from '@/constants/projects';
import Image from 'next/image';
import { ProjectVideoZoom } from './ProjectVideoZoom';

export const Projects = () => {
  return (
    <section id="projects-section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-container">
        <ProjectVideoZoom>
          <ul className="project-list">
            {PROJECTS.map((project) => (
              <li key={project.name} className="project-item">
                <div className="project-text">
                  <p className="project-name">{project.name}</p>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-technologies">
                    {project.technologies.map((tech) => (
                      <li key={tech}>
                        <span>{tech} /</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="video-wrapper">
                  <Image
                    className="project-video"
                    src={project.video}
                    alt={project.name}
                    fill
                    unoptimized
                  />
                </div>
              </li>
            ))}
          </ul>
        </ProjectVideoZoom>
      </div>
    </section>
  );
};
