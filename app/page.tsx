import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Activity } from "@/components/sections/Activity";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1 w-full">
        <Hero />
        <Projects />
        <Activity />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
