import { LuCode, LuNetwork, LuServer, LuDatabase, LuContainer, LuActivity, LuChartNoAxesCombined, LuLayers } from 'react-icons/lu';
const categories = {
  language: { label: 'Language', icon: LuCode },
  ai: { label: 'AI', icon: LuNetwork },
  backend: { label: 'Backend', icon: LuServer },
  database: { label: 'Database', icon: LuDatabase },
  infrastructure: { label: 'Infra', icon: LuContainer },
  observability: { label: 'Observability', icon: LuActivity },
  visualization: { label: 'Visualization', icon: LuChartNoAxesCombined },
  other: { label: 'Tools', icon: LuLayers },
};
const roles = { core: 'Fundamental to the architecture or primary implementation', used: 'Meaningfully used in the project', support: 'Supporting infrastructure, tooling or observability' };
export function CategoryIcon({ category }) {
  const Icon = (categories[category] || categories.other).icon;
  return <Icon aria-hidden="true" />;
}
export function TechnologyCategories({ technologies }) {
  return <ul className="technology-categories" aria-label="Technology categories">
    {[...new Set(technologies.map(tech => tech.category))].map(category => <li key={category}><CategoryIcon category={category} /><span>{categories[category]?.label || 'Tools'}</span></li>)}
  </ul>;
}
export default function TechnologyMatrix({ technologies }) {
  return <>
    <section className="technology-panel" aria-label="Technology architecture">
      <div className="technology-heading"><h3>Technology / Architecture</h3><span>{technologies.length} tools</span></div>
      <ul className="technology-matrix">
        {technologies.map(tech => <li className="technology-entry" key={tech.name}>
          <CategoryIcon category={tech.category} /><span>{tech.name}</span>
          <i className={`technology-role technology-role--${tech.role}`} role="img" aria-label={tech.role} title={`${tech.role}: ${roles[tech.role]}`} />
        </li>)}
      </ul>
      <ul className="technology-legend" aria-label="Technology roles">{Object.entries(roles).map(([role, definition]) => <li key={role} title={definition}><i className={`technology-role technology-role--${role}`} aria-hidden="true" /><span>{role}</span></li>)}</ul>
    </section>
  </>;
}
