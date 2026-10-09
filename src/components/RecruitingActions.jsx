import { LuArrowUpRight, LuMail } from 'react-icons/lu';
import './recruiting-actions.css';

export default function RecruitingActions() {
  return <nav className="recruiting-actions" aria-label="Resume and contact">
    <a className="recruiting-resume" href="/assets/resume/Resume - Archel Sutanto.pdf" target="_blank" rel="noopener noreferrer">
      Resume PDF <LuArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in new tab)</span>
    </a>
    <a className="recruiting-email" href="mailto:archeltaneka@gmail.com"><LuMail aria-hidden="true" />Email</a>
  </nav>;
}
