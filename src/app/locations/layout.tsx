import LocationSidebar from "@/components/LocationSidebar";

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <LocationSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
