import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Notices from "@/components/Notices";
import FeaturedResearch from "@/components/FeaturedResearch";
import { getNotices } from "@/lib/api";
import { getFeaturedResearch } from "@/lib/research";

export default function Home() {
  const notices = getNotices() as any[];
  const research = getFeaturedResearch() as any[];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Hero />
      <Notices notices={notices} />
      <FeaturedResearch research={research} />
      <Footer />
    </div>
  );
}
