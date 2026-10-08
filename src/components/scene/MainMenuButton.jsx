import { LuArrowLeft } from 'react-icons/lu';
import './section-navigation.css';

export default function MainMenuButton({ onClick, className = '' }) {
  return <button type="button" className={`section-back ${className}`} onClick={onClick}>
    <LuArrowLeft aria-hidden="true" /> Main menu
  </button>;
}
