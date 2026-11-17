import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { RoiCalculator } from "@/components/sections/roi-calculator";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { DemoSignup } from "@/components/sections/demo-signup";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <RoiCalculator />
        <Pricing />
        <Faq />
        <DemoSignup />
      </main>
      <Footer />
    </>
  );
}
