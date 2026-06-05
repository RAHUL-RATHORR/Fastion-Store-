export function SectionDivider() {
  return (
    <div className="relative h-px w-full bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c0c0c0]/40 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
    </div>
  );
}
