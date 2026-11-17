import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
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
        <ProofStrip />
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
