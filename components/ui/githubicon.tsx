import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export const GithubIcon = () => {
  return (
    <Link
      href="https://github.com/gusutaharu"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaGithub size={40} className="link-icon" />
    </Link>
  );
};
