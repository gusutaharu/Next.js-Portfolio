import { Contact } from '@/components/sections/contact/contact';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects/projects';
import { Skills } from '@/components/sections/skills/skills';

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
