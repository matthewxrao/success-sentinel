import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Strategy from "@/components/Strategy";
import SocialTheory from "@/components/SocialTheory";
import Impact from "@/components/Impact";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Strategy />
        <SocialTheory />
        <Impact />
        <Team />
      </main>
      <Footer />
    </>
  );
}
