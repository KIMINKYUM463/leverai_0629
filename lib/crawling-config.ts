export const crawlingConfig = {
  maxRetries: 3,
  timeout: 30000,
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  headers: {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3",
    "Accept-Encoding": "gzip, deflate",
    Connection: "keep-alive",
    "Upgrade-Insecure-Requests": "1",
  },
  selectors: {
    title: 'h1, .product-title, [data-testid="product-title"]',
    price: '.price, .product-price, [data-testid="price"]',
    image: ".product-image img, .main-image img",
    description: ".product-description, .description",
    rating: '.rating, .stars, [data-testid="rating"]',
    reviews: ".review-count, .reviews-count",
  },
}
