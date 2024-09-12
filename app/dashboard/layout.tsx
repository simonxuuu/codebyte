import Sidebar from "../components/app/dashboard/Sidebar";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div >{children}</div>
      </div>
    </>
  );
}
