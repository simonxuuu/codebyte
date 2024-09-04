import Sidebar from "../components/app/dashboard/Sidebar";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="h-full overflow-scroll flex-1">{children}</div>
      </div>
    </>
  );
}
