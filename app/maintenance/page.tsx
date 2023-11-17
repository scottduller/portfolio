import { get } from "@vercel/edge-config";
import { redirect } from "next/navigation";

const Maintenance = async () => {
  const isInMaintenanceMode = await get("isInMaintenanceMode");

  const isProduction =
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV === "production";

  if (!isProduction || !isInMaintenanceMode) {
    redirect("/");
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1>Sorry this page is down for maintenance!</h1>
    </div>
  );
};

export default Maintenance;
