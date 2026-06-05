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
      <Container className="py-6 sm:py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="#home" className="flex items-center gap-2.5 mb-3 min-h-[36px]">
              <div className="relative shrink-0 w-9 h-9 sm:w-10 sm:h-10">
                <Image
                  src="/logo.png?v=3"
                  alt="GILZOD"
                  fill
                  unoptimized
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <span className="font-[family-name:var(--font-playfair)] text-sm sm:text-base leading-none tracking-[0.15em] text-white">
                GILZOD
              </span>
            </Link>
            <p className="text-[#a1a1aa] text-xs leading-relaxed max-w-xs">
              Premium menswear for ambitious men who refuse ordinary. Rule Beyond
              Limits.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-[10px] uppercase tracking-[0.15em] text-white mb-2.5">
                {column.title}
              </h4>
              <ul className="space-y-1.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-[#a1a1aa] hover:text-[#c0c0c0] transition-colors duration-300 inline-flex py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 pt-4 border-t border-[rgba(192,192,192,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[#a1a1aa] text-[10px] tracking-wider">
            © 2026 Gilzod. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="#"
              className="text-[10px] text-[#a1a1aa] hover:text-[#c0c0c0] transition-colors py-1"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[10px] text-[#a1a1aa] hover:text-[#c0c0c0] transition-colors py-1"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
