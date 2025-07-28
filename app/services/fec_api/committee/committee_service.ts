import env from '#start/env'
import { FecApiResponse, FecApiError } from '#services/fec_api/shared/types'
import {
  CommitteeTotals,
  CommitteeTotalsOptions,
} from '#services/fec_api/committee/types/committee_types'
import { CommitteeParams } from '#services/fec_api/committee/api_params'

export class CommitteeService {
  private baseUrl: string
  private apiKey: string
  private requestTimeout: number

  constructor() {
    this.baseUrl = env.get('FEC_API_BASE_URL', 'https://api.open.fec.gov')
    this.apiKey = env.get('FEC_API_KEY', 'DEMO_KEY')
    this.requestTimeout = 30_000
  }

  /**
   * Get financial totals for a specific committee
   * Returns aggregated financial data by two-year cycle
   */
  async getCommitteeTotals(
    committeeId: string,
    options: CommitteeTotalsOptions = {}
  ): Promise<FecApiResponse<CommitteeTotals>> {
    const url = new URL(`${this.baseUrl}/v1/committee/${committeeId}/totals/`)
    const params = this.buildSearchParams(options)

    const response = await this.makeRequest(`${url}?${params}`)

    if (!response.ok) {
      const errorData = await this.parseErrorResponse(response)
      throw new FecApiError(
        'Error fetching committee totals from FEC API',
        response.status,
        errorData.message || response.statusText
      )
    }

    const data = (await response.json()) as FecApiResponse<CommitteeTotals>

    return {
      results: data.results,
      pagination: data.pagination,
    }
  }

  private buildSearchParams(options: CommitteeTotalsOptions): URLSearchParams {
    const params = new URLSearchParams({ api_key: this.apiKey })

    // Only include parameters that are valid for the FEC API
    Object.entries(options).forEach(([key, value]) => {
      const isValidParam = key in CommitteeParams
      // TODO: Log if param is invalid
      const hasValue = value !== undefined && value !== null

      if (isValidParam && hasValue) {
        if (Array.isArray(value)) {
          // Handle array parameters
          value.forEach((item) => params.append(key, String(item)))
        } else {
          params.append(key, String(value))
        }
      }
    })

    return params
  }

  private async makeRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'FEC-Candidate-Search/1.0',
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)
      return response
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new FecApiError(
          'Request timeout - FEC API request took too long',
          408,
          'Request timeout'
        )
      }
      throw error
    } finally {
      clearTimeout(timeoutId)
    }
  }

  private async parseErrorResponse(response: Response): Promise<any> {
    try {
      return await response.json()
    } catch {
      // If we can't parse JSON, return a basic error object
      return { message: response.statusText }
    }
  }
}
