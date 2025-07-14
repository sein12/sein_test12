전체 흐름:
필터링된 데이터 요청 (API 호출):

fetchPayments 함수가 /payments API 엔드포인트에 GET 요청을 보냅니다. 요청 시 필터 값(이메일, 상태, 최소 금액)과 현재 페이지 번호가 쿼리 파라미터로 전달됩니다.

API가 반환하는 데이터는 결제 내역 목록과 전체 페이지 수입니다. 이를 통해 데이터와 페이지네이션을 업데이트할 수 있습니다.

필터링 (Filters 컴포넌트):

Filters 컴포넌트는 사용자가 이메일, 상태, 최소 금액을 입력하여 필터링할 수 있는 UI를 제공합니다. 필터가 변경될 때마다 onFiltersChange 콜백을 통해 부모 컴포넌트에 변경 사항을 알리고, 해당 변경 사항에 맞는 데이터를 다시 API에서 가져옵니다.

필터링이 변경될 때마다 페이지는 초기화되어 1페이지로 설정됩니다.

테이블 (Table 컴포넌트):

Table 컴포넌트는 API 호출을 통해 받아온 데이터를 테이블 형식으로 표시합니다.

data 배열을 map을 사용하여 각 행에 대해 이메일, 상태, 금액을 렌더링합니다.

데이터가 없을 경우 No results 메시지를 표시합니다.

페이지네이션 (Pagination 컴포넌트):

**PaginationComponent**는 shadcn/ui의 Pagination 컴포넌트를 사용하여 페이지네이션을 구현합니다. PaginationPrevious, PaginationNext 버튼을 클릭하면 페이지 번호가 변경되고, 그에 따라 onPageChange를 통해 부모 컴포넌트에 새로운 페이지 번호가 전달됩니다.

PaginationEllipsis는 페이지가 많을 때 페이지 범위를 생략하는 기능을 제공합니다.

페이지 번호가 변경되면 해당 페이지에 맞는 데이터를 API에서 다시 요청합니다.

API 요청 (axiosInstance 및 fetchPayments):

**axiosInstance**는 기본 axios 인스턴스로, API의 기본 URL과 헤더를 설정합니다.

fetchPayments 함수는 이 인스턴스를 사용하여 API로부터 결제 데이터를 가져옵니다. 요청에 포함된 필터와 페이지 정보는 쿼리 파라미터로 전달됩니다.

API 응답은 데이터(items)와 전체 페이지 수(totalPages)를 포함하고 있으며, 이를 data와 totalPages 상태에 저장하여 UI에 반영합니다.

각 파일 분석:
1. Table.tsx
Table 컴포넌트는 data 배열을 받아서 테이블로 렌더링합니다.

테이블 헤더는 Email, Status, Amount로 고정되어 있고, data 배열의 각 항목을 반복하여 행을 렌더링합니다.

데이터가 없을 경우 "No results." 메시지가 표시됩니다.

2. Filters.tsx
Filters 컴포넌트는 사용자가 필터를 입력할 수 있도록 제공하며, 이메일 검색, 상태 필터, 최소 금액을 입력받습니다.

각 입력 필드는 onFiltersChange 함수를 통해 부모 컴포넌트에 필터 값을 전달하며, 필터가 변경될 때마다 API 호출을 트리거합니다.

3. Pagination.tsx
PaginationComponent는 shadcn/ui의 Pagination, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink 등을 사용하여 페이지네이션을 구현합니다.

페이지 번호는 currentPage 상태로 관리되며, onPageChange 함수로 부모 컴포넌트에 새로운 페이지를 전달합니다.

페이지 번호가 변경될 때마다 해당 페이지에 맞는 데이터를 API에서 다시 가져옵니다.

4. Page.tsx (메인 페이지 컴포넌트)
Page 컴포넌트는 페이지 전체를 구성하는 컴포넌트로, filters와 page 상태를 관리합니다.

useEffect 훅을 사용하여 filters나 page가 변경될 때마다 API 호출을 통해 데이터를 새로고침합니다.

Table과 PaginationComponent를 사용하여 데이터를 테이블로 표시하고, 페이지네이션을 제공합니다.

데이터가 로딩 중일 때는 "Loading..." 메시지를 표시합니다.

5. axiosInstance.ts
axiosInstance는 axios의 기본 인스턴스를 설정하여 API 요청 시 기본 URL 및 헤더를 설정합니다. 모든 API 요청은 이 인스턴스를 통해 이루어집니다.

6. paymentApi.ts
fetchPayments 함수는 필터와 페이지 번호를 파라미터로 받아 /payments API로 GET 요청을 보내며, 응답을 받아서 데이터를 반환합니다.

코드 흐름
사용자가 필터를 입력하거나 페이지를 변경하면, Filters 컴포넌트나 PaginationComponent에서 상태 변경이 발생합니다.

상태 변경이 발생하면 useEffect 훅이 트리거되어 fetchPayments 함수를 호출하고, 해당 데이터를 받아옵니다.

fetchPayments 함수는 axiosInstance를 사용하여 백엔드 API에 요청을 보내고, 응답받은 데이터를 data와 totalPages 상태에 저장합니다.

받은 데이터는 Table 컴포넌트에 전달되어 테이블에 표시되고, 페이지네이션은 PaginationComponent를 통해 처리됩니다.

