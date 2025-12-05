import "./globals.css";
import "leaflet/dist/leaflet.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "Hermes Cabs ",
  description: "Lightning Fast Cabs at your service",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
