import { Background } from "@/components/background";
import { Features } from "@/components/blocks/features";
import { Footer } from "@/components/blocks/footer";
import { Hero } from "@/components/blocks/hero";
import { Logos } from "@/components/blocks/logos";
import { Navbar } from "@/components/blocks/navbar";
import { Pricing } from "@/components/blocks/pricing";

export default function Home() {
  return (
    <main className="absolute w-full flex items-center flex-col">
      <Navbar />
      <Background className="via-muted to-muted/80 px-20">
        <Hero />
        <Logos />
        <Features />
        {/* <ResourceAllocation /> */}
      </Background>
      <Background variant="bottom" className="via-muted to-muted/80 px-20">
        <Pricing />
      </Background>
      <Footer />
    </main>
  );
}
