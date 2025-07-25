import env from '#start/env'
import {
  FecApiResponse,
  CandidateSearchResult,
  CandidateNameResult,
  CandidateSearchOptions,
  FecApiError,
} from '../../types/candidate_types.js'
import { API_PARAMS } from './api_params.js'

export class CandidateSearchService {
  private baseUrl: string
  private apiKey: string
  private requestTimeout: number

  constructor() {
    this.baseUrl = env.get('FEC_API_BASE_URL', 'https://api.open.fec.gov')
    this.apiKey = env.get('FEC_API_KEY', 'DEMO_KEY')
    this.requestTimeout = 30_000
  }

  /**
   * Search for candidates by name using the simple names endpoint
   * Returns basic candidate name and ID pairs
   */
  async searchCandidateNames(query: string): Promise<FecApiResponse<CandidateNameResult[]>> {
    const url = new URL(`${this.baseUrl}/v1/names/candidates/`)
    const params = new URLSearchParams({
      q: query,
      api_key: this.apiKey,
    })

    const response = await this.makeRequest(`${url}?${params}`)

    if (!response.ok) {
      const errorData = await this.parseErrorResponse(response)
      throw new FecApiError(
        'Error fetching response from FEC API',
        response.status,
        errorData.message || response.statusText
      )
    }

    const data = (await response.json()) as FecApiResponse<CandidateNameResult[]>
    return {
      results: data.results,
      pagination: null,
    }
  }

  /**
   * Search for candidates with detailed information
   * Returns comprehensive candidate data including committees, office, party, etc.
   */
  async searchCandidates(
    options: CandidateSearchOptions = {}
  ): Promise<FecApiResponse<CandidateSearchResult>> {
    const url = new URL(`${this.baseUrl}/v1/candidates/search/`)
    const params = this.buildSearchParams(options)

    const response = await this.makeRequest(`${url}?${params}`)

    if (!response.ok) {
      const errorData = await this.parseErrorResponse(response)
      throw new FecApiError(
        'Error fetching response from FEC API',
        response.status,
        errorData.message || response.statusText
      )
    }

    const data = (await response.json()) as FecApiResponse<CandidateSearchResult>

    return {
      results: data.results,
      pagination: data.pagination,
    }
  }

  private buildSearchParams(options: CandidateSearchOptions): URLSearchParams {
    const params = new URLSearchParams({ api_key: this.apiKey })

    // Only include parameters that are valid for the FEC API
    Object.entries(options).forEach(([key, value]) => {
      const isValidParam = key in API_PARAMS
      // TODO: Log if param is invalid
      const hasValue = value !== undefined && value !== null

      if (isValidParam && hasValue) {
        params.append(key, String(value))
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
