export function Card({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className={className}>
      <div className="text-xl font-bold mb-4">
        {title}
      </div>
      {children}
    </div>
  );
}
