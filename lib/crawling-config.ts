export const crawlingConfig = {
  puppeteerOptions: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu",
      "--disable-web-security",
      "--disable-features=VizDisplayCompositor",
    ],
  },
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  timeout: 30000,
  waitForSelector: 3000,
  maxProducts: 50,
  retryAttempts: 3,
  platforms: ["naver", "coupang", "gmarket"],
  categories: ["식품", "생활용품", "패션", "전자제품", "도서", "스포츠", "뷰티", "가구", "자동차용품", "기타"],
  priceRanges: [
    { min: 0, max: 10000, label: "1만원 이하" },
    { min: 10000, max: 50000, label: "1-5만원" },
    { min: 50000, max: 100000, label: "5-10만원" },
    { min: 100000, max: 500000, label: "10-50만원" },
    { min: 500000, max: Number.POSITIVE_INFINITY, label: "50만원 이상" },
  ],
}

export type CrawlingConfig = typeof crawlingConfig
