export function FiPercent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      {...props}
    >
      <line x1={19} y1={5} x2={5} y2={19} />
      <circle cx={6.5} cy={6.5} r={2.5} />
      <circle cx={17.5} cy={17.5} r={2.5} />
    </svg>
  );
}
