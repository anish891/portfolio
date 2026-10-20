import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Writing } from "@/components/sections/Writing";
import { Activity } from "@/components/sections/Activity";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main" className="flex-1 w-full">
      <Hero />
      <Projects />
      <Writing />
      <Experience />
      <Activity />
      <TechStack />
      <Contact />
    </main>
  );
}
