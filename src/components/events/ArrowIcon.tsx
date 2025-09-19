interface ArrowIconProps {
  direction: "left" | "right";
  disabled?: boolean;
  className?: string;
}

export default function ArrowIcon({
  direction,
  disabled = false,
  className = "",
}: ArrowIconProps) {
  const rotation = direction === "left" ? "rotate-180" : "";
  const color = disabled ? "#9CA3AF" : "currentColor";

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${rotation} ${className}`}
    >
      <path
        d="M3.33301 7.99967H12.6663M12.6663 7.99967L7.99967 3.33301M12.6663 7.99967L7.99967 12.6663"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
