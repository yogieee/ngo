import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-accent text-label font-semibold uppercase tracking-[4px] text-saffron",
        className
      )}
    >
      {children}
    </p>
  );
}
