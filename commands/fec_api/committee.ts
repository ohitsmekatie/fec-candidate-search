import { CommitteeParams } from '#services/fec_api/committee/api_params'
import { CommitteeService } from '#services/fec_api/committee/committee_service'
import { CommitteeTotalsOptions } from '#services/fec_api/committee/types/committee_types'
import { args, BaseCommand, flags } from '@adonisjs/core/ace'

export default class Committee extends BaseCommand {
  static commandName = 'committee'
  static description = 'Use the committee service to call the FEC API'
  static service = new CommitteeService()

  @args.string({
    description: 'The method to call: totals',
  })
  declare method: string

  @args.string({
    description: 'The committee ID to search for',
  })
  declare committeeId: string

  // Pagination parameters
  @flags.number({
    flagName: 'page',
    description: CommitteeParams.page.description,
    alias: [CommitteeParams.page.alias],
  })
  declare page: number

  @flags.number({
    flagName: 'per_page',
    description: CommitteeParams.per_page.description,
    alias: [CommitteeParams.per_page.alias],
  })
  declare per_page: number

  // Time-based parameters
  @flags.number({
    flagName: 'cycle',
    description: CommitteeParams.cycle.description,
    alias: [CommitteeParams.cycle.alias],
  })
  declare cycle: number

  // Sorting parameters
  @flags.string({
    flagName: 'sort',
    description: CommitteeParams.sort.description,
    alias: [CommitteeParams.sort.alias],
  })
  declare sort: string

  @flags.boolean({
    flagName: 'sort_hide_null',
    description: CommitteeParams.sort_hide_null.description,
    alias: [CommitteeParams.sort_hide_null.alias],
  })
  declare sort_hide_null: boolean

  @flags.boolean({
    flagName: 'sort_null_only',
    description: CommitteeParams.sort_null_only.description,
    alias: [CommitteeParams.sort_null_only.alias],
  })
  declare sort_null_only: boolean

  @flags.boolean({
    flagName: 'sort_nulls_last',
    description: CommitteeParams.sort_nulls_last.description,
    alias: [CommitteeParams.sort_nulls_last.alias],
  })
  declare sort_nulls_last: boolean

  async run() {
    const method = this.parsed.args[0]
    const committeeId = this.parsed.args[1]
    const options = this.parsed.flags

    if (!committeeId) {
      this.logger.error('Committee ID is required')
      this.logger.info('Usage example:')
      this.logger.info('  node ace committee totals C00703975')
      this.logger.info('  node ace committee totals C00703975 --cycle=2024 --sort=-receipts')
      return
    }

    try {
      switch (method) {
        case 'totals':
          return this.getTotals(committeeId, options)
        default:
          this.logger.error(`Invalid method: ${method}. Use "totals"`)
          this.logger.info('Usage examples:')
          this.logger.info('  node ace committee totals C00123456')
          this.logger.info('  node ace committee totals C00123456 --cycle=2024 --per_page=50')
          return
      }
    } catch (error: any) {
      this.handleError(error)
    }
  }

  private async getTotals(committeeId: string, options: CommitteeTotalsOptions) {
    const searchOptions = { ...options }

    // Handle array parameters that might be passed as single values
    if (searchOptions.cycle && !Array.isArray(searchOptions.cycle)) {
      searchOptions.cycle = [searchOptions.cycle]
    }

    this.logger.info(`Getting totals for committee ID: ${committeeId}`)
    this.logger.info('Using options:')
    this.logger.info(JSON.stringify(searchOptions, null, 2))

    const results = await Committee.service.getCommitteeTotals(committeeId, searchOptions)
    this.logger.info(`Found ${results.results.length} total records`)
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
