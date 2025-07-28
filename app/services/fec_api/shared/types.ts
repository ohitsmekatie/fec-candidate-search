export interface FecApiResponse<T> {
  pagination: {
    count: number
    page: number
    pages: number
    per_page: number
  } | null
  results: T[]
}

export class FecApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public apiMessage?: string
  ) {
    super(message)
    this.name = 'FecApiError'
  }
}
