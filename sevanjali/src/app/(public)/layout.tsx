import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { OrganizationJsonLd } from "@/components/JsonLd";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="public-layout">
      <OrganizationJsonLd />
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
