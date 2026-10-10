// Keep the artwork inside the existing scene-motion anchor.
export default function SkillsCharacter({ src = '/assets/skill/archel_illustration_skill.webp' }) {
  return <div className="skills-character-anchor" aria-hidden="true">
    <div className="skills-character">
      {src ? <img src={src} alt="" decoding="async" /> :
        <div className="skills-character-placeholder"><span>ARCHEL / SKILLS</span></div>}
    </div>
  </div>;
}
