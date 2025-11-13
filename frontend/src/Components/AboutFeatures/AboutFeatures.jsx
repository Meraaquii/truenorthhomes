import { useState } from 'react'
import './AboutFeatures.css';
import screen from '../../assets/screen.jpg';
import handshake from '../../assets/handshake.jpg';
import courtpaper from '../../assets/courtpaper.jpg';
import planning from '../../assets/planning.jpg';
import construction from '../../assets/construction.jpg';
import calculator from '../../assets/calculator.jpg';
import caller from '../../assets/caller.jpg';
import key from '../../assets/key.jpg';
import property from '../../assets/property.jpg';

const AboutFeatures = () => {
  const [activeSection, setActiveSection] = useState('pre-development');

  // 📘 Data configuration
  const sectionData = {
    'pre-development': [
      {
        title: 'Market Research & Feasibility Study',
        img: screen,
        reverse: false,
        points: [
          'From conducting market analysis to identifying potential locations catering to demand expectations',
          'Assessing the financial viability of the project according to the Target Group',
          'Analysing competitor projects and market trends to find a suitable differentiator',
        ],
      },
      {
        title: 'Land Acquisition',
        img: handshake,
        reverse: true,
        points: [
          'Identifying and acquiring land for prospective clientele',
          'Negotiating with landowners to ensure smooth transitioning of legal ownership',
          'Verifying land titles and resolving disputes',
        ],
      },
      {
        title: 'Legal & Regulatory Compliance Monitoring',
        img: courtpaper,
        reverse: false,
        points: [
          'Obtaining necessary approvals and permits from local authorities',
          'Ensuring compliance with zoning laws and regulations',
          'Managing environmental clearances and impact assessments',
        ],
      },
    ],

    'development': [
      {
        title: 'Design & Planning',
        img: planning,
        reverse: false,
        points: [
          'Collaborating with architects and engineers for optimized designs',
          'Preparing detailed blueprints and technical drawings',
          'Ensuring sustainable and cost-effective solutions',
        ],
      },
      {
        title: 'Construction Management',
        img: construction,
        reverse: true,
        points: [
          'Supervising on-site activities and ensuring adherence to timelines',
          'Managing material procurement and quality control',
          'Monitoring safety standards throughout the project',
        ],
      },
      {
        title: 'Budget & Resource Allocation',
        img: calculator,
        reverse: false,
        points: [
          'Allocating financial resources across stages efficiently',
          'Tracking expenses to avoid overruns',
          'Ensuring project stays within the approved budget',
        ],
      },
    ],

    'post-development': [
      {
        title: 'Project Handover',
        img: caller,
        reverse: false,
        points: [
          'Ensuring completion certificates and legal documentation',
          'Final quality checks before client delivery',
          'Smooth transition to property management',
        ],
      },
      {
        title: 'Maintenance & Facility Management',
        img: key,
        reverse: true,
        points: [
          'Overseeing long-term building maintenance services',
          'Ensuring sustainability and upkeep of assets',
          'Quick resolution of post-handover issues',
        ],
      },
      {
        title: 'Performance Evaluation',
        img: property,
        reverse: false,
        points: [
          'Gathering client feedback for future improvement',
          'Evaluating ROI and operational performance',
          'Publishing post-development impact reports',
        ],
      },
    ],
  };

  return (
    <div className='about-features-wrapper'>
      <div className="about-features">
        {/* ===== TOP SECTION ===== */}
        <div className="feat-top">
          {['pre-development', 'development', 'post-development'].map((section) => (
            <div
              key={section}
              className={`abt-feat ${activeSection === section ? 'active' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              {section.replace('-', ' ').toUpperCase()}
            </div>
          ))}
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="feat-main">
          {sectionData[activeSection].map((item, index) => (
            <div key={index} className={`feat-row ${item.reverse ? 'reverse' : ''}`}>
              <img src={item.img} alt={item.title} />
              <div className="r-details">
                <h3>{item.title}</h3>
                <ul>
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutFeatures;
