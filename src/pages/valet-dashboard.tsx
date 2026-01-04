import { useRouter } from "next/router";
import { supabase } from "../integrations/supabase/client";
import DashboardLayout from "../components/DashboardLayout";

export default function ValetDashboard() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <DashboardLayout title="Valet Dashboard" onLogout={handleLogout}>
      <div className="text-white text-center">
        <h2 className="text-2xl font-bold mb-4">QR Validation</h2>
        <p className="opacity-80">
          Scan student QR codes here to validate parking entry.
        </p>
      </div>
    </DashboardLayout>
  );
}
