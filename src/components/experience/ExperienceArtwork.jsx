import { experienceEntries } from '../../data/portfolio';
import { experienceArt } from './experience-art';

export default function ExperienceArtwork({ experience }) {
  const { character, mirror } = experienceArt;
  return (
    <div className="experience-art-entrance" aria-hidden="true">
      <div className="experience-art">
        <img className="experience-character" src={character} width="1132" height="1389" alt="" decoding="async" />
        {mirror && <div className="experience-mirror" style={{ left: mirror.left, top: mirror.top, width: mirror.width, aspectRatio: mirror.aspectRatio }}>
          <div className="memory-glass" style={{ maskImage: `url("${mirror.mask}")` }}>
            {experienceEntries.filter(item => item.reflectionImage).map(item => <img key={item.id} className="memory-photo" data-kind={item.reflectionKind ?? 'photo'} data-visible={experience.id === item.id} src={item.reflectionImage} style={{ objectPosition: item.reflectionPosition }} alt="" />)}
            <div className="memory-tint" />
            <div key={experience.id} className="memory-wash" />
          </div>
          {mirror.frame && <img className="memory-frame" src={mirror.frame} alt="" />}
          {mirror.glare && <img className="memory-glare" src={mirror.glare} alt="" />}
          {mirror.foreground && <img className="memory-foreground" src={mirror.foreground} alt="" />}
        </div>}
      </div>
    </div>
  );
}
