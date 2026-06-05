import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/lib/data";
import { Container } from "@/components/ui/Container";

const columns = [
  { title: "Brand", links: footerLinks.brand },
  { title: "Shop", links: footerLinks.shop },
  { title: "Support", links: footerLinks.support },
  { title: "Social", links: footerLinks.social },
] as const;

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[rgba(192,192,192,0.06)] pb-[env(safe-area-inset-bottom)]">
      <Container className="py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="#home" className="flex items-center gap-3 mb-4 sm:mb-6 min-h-[44px]">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10">
                <Image
                  src="/logo.png"
                  alt="GILZOD"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-[family-name:var(--font-playfair)] text-base sm:text-lg tracking-[0.15em] text-white">
                GILZOD
              </span>
            </Link>
            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-xs">
              Premium menswear for ambitious men who refuse ordinary. Rule Beyond
              Limits.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white mb-4 sm:mb-5">
                {column.title}
              </h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#a1a1aa] hover:text-[#c0c0c0] transition-colors duration-300 inline-flex min-h-[36px] items-center"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-[rgba(192,192,192,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[#a1a1aa] text-[10px] sm:text-xs tracking-wider">
            © 2026 Gilzod. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-[10px] sm:text-xs text-[#a1a1aa] hover:text-[#c0c0c0] transition-colors min-h-[44px] inline-flex items-center"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[10px] sm:text-xs text-[#a1a1aa] hover:text-[#c0c0c0] transition-colors min-h-[44px] inline-flex items-center"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
