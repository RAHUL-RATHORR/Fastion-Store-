import Link from "next/link";
import { Check } from "lucide-react";
import { seoFooterLinkColumns, whyShopGilzodPoints } from "@/lib/data";
import { Container } from "@/components/ui/Container";

export function FooterSeoContent() {
  return (
    <section className="bg-[#faf9f7] border-t border-[#ece8e3]">
      <Container className="py-8 sm:py-10 md:py-12">
        {/* Link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-[#e8e4df]">
          {seoFooterLinkColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-[#111111] mb-3">
                {column.title}
              </h3>
              <ul className="space-y-1.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-[13px] text-[#666666] hover:text-[#111111] transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Main SEO content */}
        <div className="pt-8 sm:pt-10 space-y-6 sm:space-y-7 text-[#444444] text-xs sm:text-[13px] leading-relaxed">
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-[#111111] mb-3">
              The GILZOD Shopping Experience — Where Digital Meets Style
            </h2>
            <p>
              GILZOD is built for men who want premium menswear without the compromise — sharp shirts,
              effortless tees, tailored pants, and versatile lower wear that moves from weekday meetings to
              weekend plans. Shop online with confidence, explore curated looks, and build a wardrobe that
              reflects ambition, not ordinary.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#111111] text-sm sm:text-[15px] mb-2">
              Shop Anytime, Anywhere — The Digital Shopping Experience
            </h3>
            <p className="mb-2">
              Browse the full GILZOD collection from your phone or laptop. Filter by category, discover
              new drops, and add to cart in seconds.
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Clean, mobile-first navigation for quick browsing</li>
              <li>Detailed product pages with size and fit information</li>
              <li>Pincode check for delivery availability across India</li>
              <li>Secure payments and order tracking from checkout to doorstep</li>
            </ul>
            <p className="text-[#666666] italic">
              Style tip: Start with a crisp white shirt and neutral pants — the foundation of every sharp wardrobe.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#111111] text-sm sm:text-[15px] mb-2">
              Premium Menswear, Made for Real Life
            </h3>
            <p className="mb-2">
              Every GILZOD piece is designed with fabric quality, fit, and longevity in mind — because great
              style should feel as good as it looks.
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Shirts that hold structure from morning to evening</li>
              <li>T-shirts with premium cotton feel and modern silhouettes</li>
              <li>Pants engineered for comfort without losing a tailored edge</li>
              <li>Lower wear built for movement, travel, and everyday wear</li>
            </ul>
            <p className="text-[#666666] italic">
              Pro tip: Mix structured shirts with relaxed lowers for an elevated off-duty look.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#111111] text-sm sm:text-[15px] mb-2">
              GILZOD Seasonal Collections — Year-Round Style Evolution
            </h3>
            <p>
              From breathable summer essentials to layered winter-ready pieces, GILZOD collections evolve with
              the season. Explore fresh colour palettes, updated fits, and limited drops that keep your wardrobe
              current — without chasing fleeting trends.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#111111] text-sm sm:text-[15px] mb-2">
              Seamless Online Shopping — Simple, Fast, Reliable
            </h3>
            <p className="mb-2">
              GILZOD brings together discovery, checkout, and delivery in one smooth experience — so you spend
              less time searching and more time wearing what you love.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fast browsing across shirts, tees, pants, and lower wear</li>
              <li>Easy size selection with clear product details</li>
              <li>Order updates from confirmation to delivery</li>
              <li>Dedicated support for returns, exchanges, and order help</li>
            </ul>
          </div>

          {/* Highlight box */}
          <div className="bg-white border border-[#e8e4df] rounded-sm p-5 sm:p-6">
            <h3 className="font-[family-name:var(--font-playfair)] text-base sm:text-lg text-[#111111] mb-4">
              Why Shop at GILZOD?
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {whyShopGilzodPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-[#444444]">
                  <Check className="w-3.5 h-3.5 text-[#111111] shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#111111] text-sm sm:text-[15px] mb-2">
              Upgrade Your Wardrobe — Explore GILZOD Today
            </h3>
            <p>
              Whether you are refreshing everyday essentials or building a complete smart-casual rotation,
              GILZOD makes it easy to shop premium menswear online.{" "}
              <Link href="#new-arrivals" className="text-[#111111] underline underline-offset-2 hover:no-underline">
                Explore new arrivals
              </Link>
              , browse{" "}
              <Link href="#collection" className="text-[#111111] underline underline-offset-2 hover:no-underline">
                featured categories
              </Link>
              , and follow{" "}
              <Link
                href="https://www.instagram.com/gilzod_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111] underline underline-offset-2 hover:no-underline"
              >
                @gilzod_official
              </Link>{" "}
              for the latest drops and style inspiration.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
