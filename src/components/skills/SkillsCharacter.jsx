// Replace the null source with an original transparent illustration. The slot,
// clipping, stacking and scene-motion hook remain independent of the artwork.
export default function SkillsCharacter({ src = null }) {
  return <div className="skills-character-anchor" aria-hidden="true">
    <div className="skills-character">
      {src ? <img src={src} alt="" decoding="async" /> :
        <div className="skills-character-placeholder"><span>ARCHEL / SKILLS</span></div>}
    </div>
  </div>;
}
