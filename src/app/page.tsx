import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollProgress, PageLoader } from "@/components/layout/ScrollProgress";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { StickyShopBar } from "@/components/layout/StickyShopBar";
import { SizeGuideModal } from "@/components/ui/SizeGuideModal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Hero } from "@/components/sections/Hero";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { EditorialShowcase } from "@/components/sections/EditorialShowcase";
import { CuratedLooks } from "@/components/sections/CuratedLooks";
import { SocialProof } from "@/components/sections/SocialProof";
import { FeaturedCategories } from "@/components/sections/FeaturedCategories";
import { TrendingNow } from "@/components/sections/TrendingNow";
import { ShopTheDrop } from "@/components/sections/ShopTheDrop";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import { WhyGilzod } from "@/components/sections/WhyGilzod";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { PressStrip } from "@/components/sections/PressStrip";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { StoreLocator } from "@/components/sections/StoreLocator";
import { Newsletter } from "@/components/sections/Newsletter";

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
      <PageTransition>
        <main className="w-full max-w-[1920px] mx-auto overflow-x-hidden pb-20 md:pb-0">
          <Hero />
          <MarqueeStrip />
          <SectionDivider />
          <EditorialShowcase />
          <CuratedLooks />
          <SocialProof />
          <SectionDivider />
          <FeaturedCategories />
          <TrendingNow />
          <ShopTheDrop />
          <SectionDivider />
          <FeaturedCollection />
          <WhyGilzod />
          <ReviewsSection />
          <PressStrip />
          <InstagramFeed />
          <StoreLocator />
          <Newsletter />
        </main>
      </PageTransition>
      <Footer />
      <StickyShopBar />
      <MobileBottomNav />
    </>
  );
}
