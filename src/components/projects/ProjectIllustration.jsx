/** Replace project.illustration with a transparent WebP/PNG; positioning stays intact. */
export default function ProjectIllustration({ project }) {
  return (
    <div className="project-illustration" aria-hidden="true">
      {project.illustration ? <img src={project.illustration} alt="" decoding="async" /> : <>
        <svg className="project-art-placeholder" viewBox="0 0 640 700" fill="none">
          <path className="art-plane art-plane--back" d="M320 35 590 205 520 575 260 660 75 395Z" />
          <path className="art-plane" d="m320 105 190 130-38 260-195 95-142-227Z" />
          <path className="art-outline" d="m320 35-43 555M75 395l435-160M260 660l17-70 313-385M320 105l-43 485" />
          <path className="art-bracket" d="M140 165v-45h45m320 455v45h-45M80 530v40h40m430-450h40v40" />
        </svg>
        <div className="project-art-caption"><span>PROJECT ART / PLACEHOLDER</span><strong>{project.name}</strong><small>Illustration to follow</small></div>
      </>}
    </div>
  );
}
