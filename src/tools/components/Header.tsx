export default function Header({ title, sub }: { title: string; sub?: string }) {
  return (
    <header className="page-header">
      <h1 className="page-title">{title}</h1>
      {sub && <p className="page-sub">{sub}</p>}
    </header>
  );
}
