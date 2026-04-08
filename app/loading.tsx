import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="font-body text-navy-400 text-sm animate-pulse">
          Memuat halaman...
        </p>
      </div>
    </div>
  );
}
