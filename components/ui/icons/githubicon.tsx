import { FaGithub } from 'react-icons/fa';

export const GithubIcon = () => {
  return (
    <a
      aria-label="GitHub"
      href="https://github.com/gusutaharu"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaGithub size={40} className="link-icon" />
    </a>
  );
};
