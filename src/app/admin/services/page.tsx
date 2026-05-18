import { ResourceManager } from "@/features/admin/resource-manager";

export default function AdminServicesPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b56d]">Services</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Manage service catalog.</h1>
      </div>
      <ResourceManager type="services" />
    </div>
  );
}
