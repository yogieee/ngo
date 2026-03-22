export function DiagonalDivider({
  flip = false,
  color = "#FAF6EE",
}: {
  flip?: boolean;
  color?: string;
}) {
  return (
    <div className="relative h-16 -mt-1 overflow-hidden">
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <polygon
          points={flip ? "0,64 1440,0 1440,64" : "0,0 1440,64 0,64"}
          fill={color}
        />
      </svg>
    </div>
  );
}
