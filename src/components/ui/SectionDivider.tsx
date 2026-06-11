export function SectionDivider() {
  return (
    <div className="relative h-px w-full bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4d4d4]/60 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
    </div>
  );
}
