import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects';
import StarField from '../components/StarField';

const ProjectsArchive = () => {
    const [filter, setFilter] = useState('all');
    const categories = ['all', 'graphics', 'video', 'code', 'photos'];

    const filtered = projectsData.filter(p => filter === 'all' || p.category === filter);

    return (
        <div className="container" style={{ paddingTop: '150px', minHeight: '100vh' }}>
            <StarField />
            <h1 className="massive-title" style={{ marginBottom: '40px' }}>ARCHIVE</h1>
            
            <div style={{ display: 'flex', gap: '15px', marginBottom: '60px', flexWrap: 'wrap' }}>
                {categories.map(c => (
                    <button 
                        key={c} 
                        onClick={() => setFilter(c)}
                        style={{ 
                            background: filter === c ? 'var(--accent)' : 'transparent',
                            color: filter === c ? '#fff' : 'var(--text-dim)',
                            border: `1px solid ${filter === c ? 'var(--accent)' : 'var(--glass-border)'}`,
                            padding: '8px 20px',
                            borderRadius: '100px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                        }}
                    >
                        {c}
                    </button>
                ))}
            </div>

            <div className="glass-grid">
                {filtered.map((p, idx) => <ProjectCard key={idx} project={p} />)}
            </div>
        </div>
    );
};

export default ProjectsArchive;