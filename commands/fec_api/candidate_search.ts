import { API_PARAMS } from '#services/fec_api/candidate_search/api_params'
import { CandidateSearchService } from '#services/fec_api/candidate_search/candidate_search_service'
import { CandidateSearchOptions } from '#services/fec_api/candidate_search/types/candidate_types'
import { args, BaseCommand, flags } from '@adonisjs/core/ace'

export default class CandidateSearch extends BaseCommand {
  static commandName = 'candidate:search'
  static description = 'Use the candidate search service to call the FEC API'
  static service = new CandidateSearchService()

  @args.string({
    description: 'The method to call: names or search',
  })
  declare method: string

  @args.string({
    required: false,
    description: 'The query to search for. Required for the `names` method',
  })
  declare query: string

  @flags.string({
    flagName: 'candidate_id',
    description: API_PARAMS.candidate_id.description,
    alias: [API_PARAMS.candidate_id.alias],
  })
  declare candidate_id: string

  // Location and office parameters
  @flags.string({
    flagName: 'office',
    description: API_PARAMS.office.description,
    alias: [API_PARAMS.office.alias],
  })
  declare office: string

  @flags.string({
    flagName: 'state',
    description: API_PARAMS.state.description,
    alias: [API_PARAMS.state.alias],
  })
  declare state: string

  @flags.string({
    flagName: 'district',
    description: API_PARAMS.district.description,
    alias: [API_PARAMS.district.alias],
  })
  declare district: string

  @flags.string({
    flagName: 'party',
    description: API_PARAMS.party.description,
    alias: [API_PARAMS.party.alias],
  })
  declare party: string

  // Election parameters
  @flags.number({
    flagName: 'cycle',
    description: API_PARAMS.cycle.description,
    alias: [API_PARAMS.cycle.alias],
  })
  declare cycle: number

  @flags.number({
    flagName: 'election_year',
    description: API_PARAMS.election_year.description,
    alias: [API_PARAMS.election_year.alias],
  })
  declare election_year: number

  // Status parameters
  @flags.boolean({
    flagName: 'is_active_candidate',
    description: API_PARAMS.is_active_candidate.description,
    alias: [API_PARAMS.is_active_candidate.alias],
  })
  declare is_active_candidate: boolean

  @flags.string({
    flagName: 'candidate_status',
    description: API_PARAMS.candidate_status.description,
    alias: [API_PARAMS.candidate_status.alias],
  })
  declare candidate_status: string

  @flags.string({
    flagName: 'incumbent_challenge',
    description: API_PARAMS.incumbent_challenge.description,
    alias: [API_PARAMS.incumbent_challenge.alias],
  })
  declare incumbent_challenge: string

  @flags.boolean({
    flagName: 'federal_funds_flag',
    description: API_PARAMS.federal_funds_flag.description,
    alias: [API_PARAMS.federal_funds_flag.alias],
  })
  declare federal_funds_flag: boolean

  @flags.boolean({
    flagName: 'has_raised_funds',
    description: API_PARAMS.has_raised_funds.description,
    alias: [API_PARAMS.has_raised_funds.alias],
  })
  declare has_raised_funds: boolean

  // Pagination parameters
  @flags.number({
    flagName: 'page',
    description: API_PARAMS.page.description,
    alias: [API_PARAMS.page.alias],
  })
  declare page: number

  @flags.number({
    flagName: 'per_page',
    description: API_PARAMS.per_page.description,
    alias: [API_PARAMS.per_page.alias],
  })
  declare per_page: number

  @flags.string({
    flagName: 'sort',
    description: API_PARAMS.sort.description,
    alias: [API_PARAMS.sort.alias],
  })
  declare sort: string

  async run() {
    const method = this.parsed.args[0]
    const query = this.parsed.args[1]
    const options = this.parsed.flags

    try {
      switch (method) {
        case 'names':
          return this.doNamesSearch(query)
        case 'search':
          return this.doSearch(options)
        default:
          this.logger.error(`Invalid method: ${method} Use "names" or "search"`)
          this.logger.info('Usage examples:')
          this.logger.info('  node ace candidate:search names "Biden"')
          this.logger.info('  node ace candidate:search search "Biden" --office=P --active=true')
          return
      }
    } catch (error: any) {
      this.handleError(error)
    }
  }

  private async doNamesSearch(query: string) {
    if (!query) {
      this.logger.error('Query is required for the names method')
      return
    }

    this.logger.info(`Searching for candidate names with query: "${query}"`)
    const results = await CandidateSearch.service.searchCandidateNames(query)
    this.logger.info(`Found ${results.results.length} candidates`)
    this.logger.info(JSON.stringify(results.results, null, 2))
  }

  private async doSearch(options: CandidateSearchOptions) {
    // Let the service handle parameter parsing and validation
    const searchOptions = { ...options }

    this.logger.info('Searching for candidates with options:')
    this.logger.info(JSON.stringify(searchOptions, null, 2))

    const results = await CandidateSearch.service.searchCandidates(searchOptions)
    this.logger.info(`Found ${results.results.length} candidates`)
    this.logger.info(`Pagination: ${JSON.stringify(results.pagination)}`)
    this.logger.info(JSON.stringify(results.results, null, 2))
  }

  private handleError(error: any) {
    this.logger.error('Error:', error.message)
    if (error.statusCode) {
      this.logger.error(`Status Code: ${error.statusCode}`)
    }
    if (error.apiMessage) {
      this.logger.error(`API Message: ${error.apiMessage}`)
    }
  }
}
