import { Navbar } from "@/components/layout/Navbar";
import { PincodeBar } from "@/components/layout/PincodeBar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollProgress, PageLoader } from "@/components/layout/ScrollProgress";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SizeGuideModal } from "@/components/ui/SizeGuideModal";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCategories } from "@/components/sections/FeaturedCategories";
import { ShopYourSizeBanner } from "@/components/sections/ShopYourSizeBanner";
import { NewAndPopular } from "@/components/sections/NewAndPopular";
import { WhyGilzod } from "@/components/sections/WhyGilzod";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { BrandStory } from "@/components/sections/BrandStory";
import { FooterSeoContent } from "@/components/sections/FooterSeoContent";

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <CursorGlow />
      <CartDrawer />
      <SearchOverlay />
      <SizeGuideModal />
      <Navbar />
      <PincodeBar />
      <PageTransition>
        <main className="w-full max-w-[1920px] mx-auto overflow-x-hidden pb-20 md:pb-0 bg-white">
          <Hero />
          <FeaturedCategories />
          <ShopYourSizeBanner />
          <NewAndPopular />
          <WhyGilzod />
          <ReviewsSection />
          <InstagramFeed />
          <BrandStory />
        </main>
      </PageTransition>
      <FooterSeoContent />
      <Footer />
      <MobileBottomNav />
    </>
  );
}
