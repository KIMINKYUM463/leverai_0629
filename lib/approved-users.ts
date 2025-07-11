// 미리 승인된 사용자 목록 (이름, 전화번호)
export const APPROVED_USERS = [
  { name: "권희정", phone: "01062778212" },
  { name: "금현아", phone: "01093851436" },
  { name: "김도희", phone: "01088740499" },
  { name: "김동철", phone: "01024933291" },
  { name: "김미경", phone: "01096252642" },
  { name: "김보라", phone: "01066492667" },
  { name: "김선영", phone: "01042462500" },
  { name: "김성일", phone: "01085793326" },
  { name: "김순자", phone: "01091399072" },
  { name: "김승현", phone: "01035855558" },
  { name: "김용수", phone: "01063094594" },
  { name: "김은희", phone: "01054646610" },
  { name: "김정진", phone: "01086257284" },
  { name: "김종배", phone: "01062633439" },
  { name: "김진오", phone: "01072729557" },
  { name: "김채원", phone: "01031925651" },
  { name: "김태진", phone: "01041919035" },
  { name: "김태희", phone: "01055333888" },
  { name: "문수지", phone: "01089287327" },
  { name: "문정현", phone: "01092464288" },
  { name: "문정호", phone: "01042427894" },
  { name: "박규탁", phone: "01057637703" },
  { name: "박언주", phone: "01041336327" },
  { name: "박영", phone: "01044761059" },
  { name: "박인식", phone: "01087709225" },
  { name: "박진석", phone: "01088598419" },
  { name: "박홍석", phone: "01089303642" },
  { name: "반윤정", phone: "01073757316" },
  { name: "백민규", phone: "01099363607" },
  { name: "백순영", phone: "01033166450" },
  { name: "서진호", phone: "01034580647" },
  { name: "손영애", phone: "01064249318" },
  { name: "송재준", phone: "01064009635" },
  { name: "송중배", phone: "01088565697" },
  { name: "신동민", phone: "01083313729" },
  { name: "신현선", phone: "01090863300" },
  { name: "안성훈", phone: "01045273296" },
  { name: "안우성", phone: "01029991291" },
  { name: "안인숙", phone: "01036508133" },
  { name: "양진수", phone: "01089018394" },
  { name: "여혜영", phone: "01087037083" },
  { name: "염주혜", phone: "01093594578" },
  { name: "오해수", phone: "01020311397" },
  { name: "옥춘희", phone: "01032490042" },
  { name: "윤태겸", phone: "01059414520" },
  { name: "이명희", phone: "01081810861" },
  { name: "이미정", phone: "01037057456" },
  { name: "이성빈", phone: "01034483240" },
  { name: "이영은", phone: "01028101499" },
  { name: "한옥희", phone: "01035150216" },
  { name: "이유정", phone: "01092340889" },
  { name: "이은우", phone: "01087479392" },
  { name: "이재열", phone: "01047426974" },
  { name: "이재진", phone: "01032039192" },
  { name: "이주찬", phone: "01072692555" },
  { name: "이현옥", phone: "01057215544" },
  { name: "이호영", phone: "01055384670" },
  { name: "이효진", phone: "01089841548" },
  { name: "임서연", phone: "01091495698" },
  { name: "임해동", phone: "01028320075" },
  { name: "임현호", phone: "01020003332" },
  { name: "장보경", phone: "01073223377" },
  { name: "정선미", phone: "01085766948" },
  { name: "정윤미", phone: "01085895958" },
  { name: "정의선", phone: "01052489287" },
  { name: "정하율", phone: "01090927382" },
  { name: "조미숙", phone: "01047249312" },
  { name: "조민호", phone: "01098775873" },
  { name: "조혜진", phone: "01085893139" },
  { name: "주송이", phone: "01068001135" },
  { name: "주현선", phone: "01054930921" },
  { name: "진임정", phone: "01091558949" },
  { name: "차현숙", phone: "01054189190" },
  { name: "최금영", phone: "01077516617" },
  { name: "최두훈", phone: "01090152362" },
  { name: "최사일", phone: "01021654158" },
  { name: "최성자", phone: "01036172952" },
  { name: "최승민", phone: "01053279807" },
  { name: "최영범", phone: "01031371114" },
  { name: "최태한", phone: "01093554866" },
  { name: "최화용", phone: "01027996868" },
  { name: "한태원", phone: "01044662115" },
  { name: "홍희주", phone: "01022917094" },
  { name: "황대석", phone: "01099894897" },
  { name: "XU JINGAI", phone: "01042903467" },
  { name: "윈스", phone: "01011112222" },
  { name: "윈스3", phone: "01033334444" },
]

/**
 * 전화번호에서 하이픈과 공백을 제거하여 숫자만 반환
 */
export function normalizePhone(phone: string): string {
  return phone.replace(/[^0-9]/g, "")
}

/**
 * 이름과 전화번호가 승인된 사용자 목록에 있는지 확인
 */
export function isApprovedUser(name: string, phone: string): boolean {
  const normalizedInputPhone = normalizePhone(phone)
  const trimmedName = name.trim()

  return APPROVED_USERS.some((user) => user.name === trimmedName && user.phone === normalizedInputPhone)
}
