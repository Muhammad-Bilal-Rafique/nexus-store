export default function ReviewsLoader() {
  return (
    <div className="space-y-6 mt-12">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white p-6 rounded-3xl border border-gray-100"
        >
          <div className="flex gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6 mt-2" />
        </div>
      ))}
    </div>
  );
}