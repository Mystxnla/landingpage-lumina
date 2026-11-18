import { About } from "./components/About";
import { Audience } from "./components/Audience";
import { Faq } from "./components/Faq";
import { Features } from "./components/Features";
import { ClosingCta, Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Preview } from "./components/Preview";
import { Reasons } from "./components/Reasons";
import { Steps } from "./components/Steps";
import { Stories } from "./components/Stories";
import { Ticker } from "./lumina-ui";
import { APP_NAME } from "./config";

// Urutan bagian mengikuti kerangka referensi STEMY.
export function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-paper">
      <Navbar />
      <main>
        <Hero />
        <Ticker
          items={[
            "Belajar bertingkat",
            "X-Ray Kesalahan",
            "Kampus impian",
            "Peta pulau awan",
            "XP & bintang",
            "Tes diagnostik",
          ]}
        />
        <Reasons />
        <Features />
        <Audience />
        <Ticker items={["Cara kerja"]} />
        <Steps />
        <Preview />
        <Stories />
        <Ticker tone="paper" items={[`Tentang ${APP_NAME}`]} />
        <About />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
