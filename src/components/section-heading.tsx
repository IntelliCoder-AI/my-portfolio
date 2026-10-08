export function SectionHeading({
  number,
  label,
  title,
  description,
  lines,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
  lines?: string[];
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span className="section-number">{number} /</span> {label}
      </p>
      <h2>{lines ? lines.map((line) => <span className="heading-line" key={line}>{line}{" "}</span>) : title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
