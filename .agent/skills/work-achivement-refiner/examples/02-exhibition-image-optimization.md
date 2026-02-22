# Example 2: 졸업전시 – 이미지 로드 최적화

## Input

이미지 로드 타이밍 제어를 통한 체감 성능 개선

PROBLEM
상세 페이지 진입 시 상단, 하단 이미지가 동시에 로드되어 초기 렌더링 부하 발생
주요 이미지가 늦게 나타나 페이지가 뒤늦게 로드되는 듯한 인상을 유발
이미지 로드 시점 제어가 없어 Layout Shift 발생 가능성 존재

ACTION
카드 Hover 시 상세 페이지 상단 주요 이미지 사전로드 적용
Intersection Observer 기반으로 하단 본문 이미지 지연로드 처리
초기 렌더링에 필요한 리소스와 이후 로드할 리소스를 명확히 분리

RESULT
FCP 32% 개선 (4.1s → 2.8s)
CLS 0.214 → 0
불필요한 초기 이미지 로드 제거로 렌더링 부하 감소

BACKGROUND
상세 페이지는 전환 직후 상단 주요 이미지의 즉각적인 노출이 중요한 구조였습니다.
하단 본문 이미지는 초기 시점에 반드시 로드될 필요가 없는 콘텐츠였습니다.

---

## Structured Output

# 이미지 로드 전략 분리를 통한 FCP 32% 개선 및 CLS 안정화

## BACKGROUND

상세 페이지는 전환 직후 상단 주요 이미지의 즉각적인 노출이 중요한 구조였습니다.  
하단 본문 이미지는 초기 로딩 시 반드시 필요한 콘텐츠가 아니었습니다.

## PROBLEM

상단·하단 이미지가 동시에 로드되어 초기 렌더링 부하가 발생했습니다.  
주요 이미지 노출이 지연되어 체감 성능 저하가 발생했습니다.  
로드 타이밍 제어가 없어 Layout Shift 가능성이 존재했습니다.

## ACTION

카드 Hover 시 상단 주요 이미지를 사전 로드했습니다.  
Intersection Observer 기반으로 하단 이미지를 지연 로드 처리했습니다.  
초기 렌더링 리소스와 이후 리소스를 명확히 분리했습니다.

## RESULT

FCP 32% 개선 (4.1s → 2.8s)  
CLS 0.214 → 0  
초기 렌더링 부하 감소

### Tech Keywords

Intersection Observer, Preload Strategy, Lazy Loading, Web Performance Optimization
