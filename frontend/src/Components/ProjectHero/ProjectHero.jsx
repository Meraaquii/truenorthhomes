import React from 'react'
import './ProjectHero.css';
import bg from '../../assets/project_banner.jpg';
const ProjectHero = () => {
  return (
    <div className='project-hero-wrapper'>
      <div className="project-hero">
        <img src={bg} alt="" />
      </div>
    </div>
  )
}

export default ProjectHero
