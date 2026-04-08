import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header skeleton */}
      <div className="bg-gradient-navy py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-10 w-64 bg-white/10 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-1 w-16 bg-gold/30 rounded-full mx-auto mb-6" />
          <div className="h-6 w-96 bg-white/10 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 border border-navy-50 animate-pulse"
            >
              <div className="h-12 w-12 bg-navy-50 rounded-xl mb-6" />
              <div className="h-6 w-3/4 bg-navy-50 rounded mb-3" />
              <div className="h-4 w-full bg-navy-50 rounded mb-2" />
              <div className="h-4 w-5/6 bg-navy-50 rounded mb-2" />
              <div className="h-4 w-2/3 bg-navy-50 rounded" />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <LoadingSpinner size="md" />
        </div>
      </div>
    </div>
  );
}
