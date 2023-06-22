import { useRouter } from "next/router";

import Header from "components/Header/Header";
import AdminHeader from "components/Header/AdminHeader";
import Footer from "components/Footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  const isAdmin = pathname.includes("/admin");

  return (
    <>
      {isAdmin ? <AdminHeader /> : <Header />}
      {children}
      <Footer />
    </>
  );
}
