import Sidebar from "./dashboardNavBar";

export default function Layout({ children }) {
  return (
    <>
      <div className="dashboardLayout">
        
        <Sidebar />
        {children}
      </div>
    </>
  );
}
