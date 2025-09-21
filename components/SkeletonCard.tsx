export default function SkeletonCard() {
  return (
    <div className="card p-4 animate-pulse">
      <div className="h-40 bg-gray-100 rounded-xl mb-3" />
      <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
      <div className="h-6 bg-gray-100 rounded w-1/4" />
    </div>
  );
}
