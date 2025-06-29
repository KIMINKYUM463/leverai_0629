export function SitePreview() {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-teal-600 text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">농부네 직거래 장터</div>
            <div className="flex gap-4">
              <span>홈</span>
              <span>상품</span>
              <span>주문</span>
              <span>문의</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-teal-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">신선한 농수산물을 직거래로 만나보세요</h1>
          <p className="mb-8">농부에서 식탁까지, 중간 유통 과정 없이 신선하게 배송해드립니다.</p>
          <button className="bg-white text-teal-600 px-6 py-2 rounded-md font-medium">상품 둘러보기</button>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">인기 상품</h2>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-md overflow-hidden">
              <div className="aspect-square bg-gray-100"></div>
              <div className="p-4">
                <h3 className="font-medium">상품 {i}</h3>
                <p className="text-gray-500 text-sm">상품 설명</p>
                <p className="font-bold mt-2">₩25,000</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">왜 농부네 직거래 장터인가요?</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-md">
              <h3 className="font-bold mb-2">신선한 품질</h3>
              <p className="text-gray-600">산지에서 바로 배송되는 신선한 농수산물</p>
            </div>
            <div className="bg-white p-6 rounded-md">
              <h3 className="font-bold mb-2">합리적인 가격</h3>
              <p className="text-gray-600">중간 유통 마진 없는 직거래 가격</p>
            </div>
            <div className="bg-white p-6 rounded-md">
              <h3 className="font-bold mb-2">안전한 먹거리</h3>
              <p className="text-gray-600">철저한 품질 관리와 검수 시스템</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 text-white py-6">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div>
              <h3 className="font-bold mb-2">농부네 직거래 장터</h3>
              <p className="text-gray-400 text-sm">신선한 농수산물 직거래 플랫폼</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">© 2025 농부네 직거래 장터. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
