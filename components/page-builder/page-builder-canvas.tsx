export function PageBuilderCanvas() {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 min-h-[400px] bg-white flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">요소를 이곳으로 드래그하세요</h3>
        <p className="text-gray-500 max-w-md">왼쪽 도구상자에서 요소를 드래그하여 상세페이지를 구성하세요.</p>
      </div>
    </div>
  )
}
