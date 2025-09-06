export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
      <p className="text-gray-600">Loading your personalized recommendations...</p>
    </div>
  )
}