export const metadata = {
  title: "Admin | Sevanjali Prathishtana",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-layout">{children}</div>;
}
