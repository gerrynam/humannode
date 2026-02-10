

# Google Maps를 Leaflet(OpenStreetMap)으로 교체

Google Maps API가 계속 로딩 문제를 일으키고 있어서, API 키가 필요 없는 Leaflet + OpenStreetMap 타일로 교체합니다. 차분하고 쨍하지 않은 톤을 위해 Carto Light (Positron) 타일을 사용합니다.

---

## 변경 사항

### 1. 패키지 정리
- `@googlemaps/js-api-loader`, `@types/google.maps` 제거
- `leaflet` (이미 설치됨), `react-leaflet`, `@types/leaflet` 추가

### 2. `src/config/googleMaps.ts` 삭제
- 더 이상 필요 없음

### 3. `src/components/home/HomeMap.tsx` 재작성
- Leaflet `MapContainer` + `TileLayer` 사용
- 타일: **Carto Positron** (`https://{s}.basemaps.cartocdn.com/light_all/...`) -- 회색/연한 톤
- CSS 필터 `saturate(0.4) brightness(1.05)`로 더 차분한 톤 적용
- 현재 위치: `CircleMarker` (파란 점 + 투명 원)
- 요청 마커: `divIcon`으로 커스텀 원형 마커 (카테고리별 색상)
- 마커 클릭 시 `Popup`으로 금액 표시 (기존 InfoWindow 대체)
- `onMapInteraction` 콜백: `dragstart`, `zoomstart` 이벤트 연결

### 4. `src/components/jobs/JobProgressMap.tsx` 재작성
- 동일한 Carto Positron 타일 + CSS 필터 적용
- 빨간 핀 마커 + 라벨 Popup

### 5. `src/index.css`에 Leaflet CSS import 추가
- Leaflet 기본 CSS를 CDN으로 import

---

## 기술 상세

- Carto Positron 타일은 무료이며 API 키 불필요
- 기존 마커 색상 체계 (AI_AGENT: navy, HUMAN_WEB: green, PARTNER_ROUTED: purple) 유지
- `Home.tsx`와 `JobProgress.tsx`는 변경 없음 (동일한 props 인터페이스 유지)
