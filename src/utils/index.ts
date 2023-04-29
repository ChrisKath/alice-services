export function usePaginate<P = any>(payload: P[], total: number, page: number, limit: number) {
  const lastPage = Math.ceil(total / limit)
  const nextPage = page + 1 > lastPage ? null : page + 1
  const prevPage = page - 1 < 1 ? null : page - 1

  return {
    data: payload,
    total,
    currentPage: page,
    nextPage,
    prevPage,
    lastPage,
    totalPage: lastPage
  }
}

export function useQueryPaginate(query: { page?: number; limit?: number }) {
  return [query.page || 1, query.limit || 10]
}
