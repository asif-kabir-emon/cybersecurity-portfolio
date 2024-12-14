import Header from "@/components/Shared/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen h-full overflow-y-auto bg-white">
      <Header />
      <div>{children}</div>
    </div>
  );
}
