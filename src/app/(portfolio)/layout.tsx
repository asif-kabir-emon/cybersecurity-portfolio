import Header from "@/components/Shared/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      <div>{children}</div>
    </div>
  );
}
