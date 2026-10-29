import { AboutSection } from "@/components/sections/home/AboutSection";
import { ConnectedIntegrations } from "@/components/sections/home/ConnectedIntegrations";
import { GrowthStory } from "@/components/sections/home/GrowthStory";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { RetentionStack } from "@/components/sections/home/RetentionStack";
import { SupportSection } from "@/components/sections/home/SupportSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { TrustStrip } from "@/components/sections/home/TrustStrip";

export default function Home() {
  return (
    <div className="home-pattern">
      <HomeHero />
      <TrustStrip />
      <AboutSection />
      <RetentionStack />
      <ConnectedIntegrations />
      <GrowthStory />
      <TestimonialsSection />
      <SupportSection />
    </div>
  );
}
