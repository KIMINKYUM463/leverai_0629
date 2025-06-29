const categories = ["전체", "배경", "사람", "자연", "음식", "동물"]
const photos = [
  { id: 1, url: "/placeholder.svg?height=100&width=150" },
  { id: 2, url: "/placeholder.svg?height=100&width=150" },
  { id: 3, url: "/placeholder.svg?height=100&width=150" },
  { id: 4, url: "/placeholder.svg?height=100&width=150" },
  { id: 5, url: "/placeholder.svg?height=100&width=150" },
  { id: 6, url: "/placeholder.svg?height=100&width=150" },
]

export function PhotosPanel() {
  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="사진 검색..."
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span key={category} className="text-xs bg-gray-800 px-2 py-1 rounded cursor-pointer hover:bg-gray-700">
            {category}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {photos.map((photo) => (
          <div key={photo.id} className="cursor-pointer group">
            <div className="bg-gray-800 rounded overflow-hidden aspect-[3/2] group-hover:ring-1 group-hover:ring-gray-500">
              <img
                src={photo.url || "/placeholder.svg"}
                alt={`Photo ${photo.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
