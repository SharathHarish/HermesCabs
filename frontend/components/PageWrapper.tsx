import Sidebar from "./Sidebar";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-lightBg">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="p-8 overflow-y-auto">
        </main>
      </div>
    </div>
  );
}
