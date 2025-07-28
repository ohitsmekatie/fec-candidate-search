import { CandidateCommitteeParams } from '#services/fec_api/candidate_committees/api_params'
import { CandidateCommitteesService } from '#services/fec_api/candidate_committees/candidate_committees_service'
import { CandidateCommitteesOptions } from '#services/fec_api/candidate_committees/types/committee_types'
import { args, BaseCommand, flags } from '@adonisjs/core/ace'

export default class CandidateCommittees extends BaseCommand {
  static commandName = 'candidate:committees'
  static description = 'Use the candidate committees service to call the FEC API'
  static service = new CandidateCommitteesService()

  @args.string({
    description: 'The candidate ID to search for committees',
  })
  declare candidateId: string

  // Pagination parameters
  @flags.number({
    flagName: 'page',
    description: CandidateCommitteeParams.page.description,
    alias: [CandidateCommitteeParams.page.alias],
  })
  declare page: number

  @flags.number({
    flagName: 'per_page',
    description: CandidateCommitteeParams.per_page.description,
    alias: [CandidateCommitteeParams.per_page.alias],
  })
  declare per_page: number

  // Time-based parameters
  @flags.number({
    flagName: 'year',
    description: CandidateCommitteeParams.year.description,
    alias: [CandidateCommitteeParams.year.alias],
  })
  declare year: number

  @flags.number({
    flagName: 'cycle',
    description: CandidateCommitteeParams.cycle.description,
    alias: [CandidateCommitteeParams.cycle.alias],
  })
  declare cycle: number

  // Committee characteristics
  @flags.string({
    flagName: 'filing_frequency',
    description: CandidateCommitteeParams.filing_frequency.description,
    alias: [CandidateCommitteeParams.filing_frequency.alias],
  })
  declare filing_frequency: string

  @flags.string({
    flagName: 'designation',
    description: CandidateCommitteeParams.designation.description,
    alias: [CandidateCommitteeParams.designation.alias],
  })
  declare designation: string

  @flags.string({
    flagName: 'organization_type',
    description: CandidateCommitteeParams.organization_type.description,
    alias: [CandidateCommitteeParams.organization_type.alias],
  })
  declare organization_type: string

  @flags.string({
    flagName: 'committee_type',
    description: CandidateCommitteeParams.committee_type.description,
    alias: [CandidateCommitteeParams.committee_type.alias],
  })
  declare committee_type: string

  // Sorting parameters
  @flags.string({
    flagName: 'sort',
    description: CandidateCommitteeParams.sort.description,
    alias: [CandidateCommitteeParams.sort.alias],
  })
  declare sort: string

  @flags.boolean({
    flagName: 'sort_hide_null',
    description: CandidateCommitteeParams.sort_hide_null.description,
    alias: [CandidateCommitteeParams.sort_hide_null.alias],
  })
  declare sort_hide_null: boolean

  @flags.boolean({
    flagName: 'sort_null_only',
    description: CandidateCommitteeParams.sort_null_only.description,
    alias: [CandidateCommitteeParams.sort_null_only.alias],
  })
  declare sort_null_only: boolean

  @flags.boolean({
    flagName: 'sort_nulls_last',
    description: CandidateCommitteeParams.sort_nulls_last.description,
    alias: [CandidateCommitteeParams.sort_nulls_last.alias],
  })
  declare sort_nulls_last: boolean

  async run() {
    const candidateId = this.parsed.args[0]
    const options = this.parsed.flags

    if (!candidateId) {
      this.logger.error('Candidate ID is required')
      this.logger.info('Usage example:')
      this.logger.info('  node ace candidate:committees P80000722')
      this.logger.info('  node ace candidate:committees P80000722 --cycle=2024 --designation=P')
      return
    }

    try {
      await this.getCommittees(candidateId, options)
    } catch (error: any) {
      this.handleError(error)
    }
  }

  private async getCommittees(candidateId: string, options: CandidateCommitteesOptions) {
    const searchOptions = { ...options }

    // Handle array parameters that might be passed as single values
    if (searchOptions.year && !Array.isArray(searchOptions.year)) {
      searchOptions.year = [searchOptions.year]
    }

    if (searchOptions.cycle && !Array.isArray(searchOptions.cycle)) {
      searchOptions.cycle = [searchOptions.cycle]
    }

    if (searchOptions.filing_frequency && !Array.isArray(searchOptions.filing_frequency)) {
      searchOptions.filing_frequency = [searchOptions.filing_frequency]
    }

    if (searchOptions.designation && !Array.isArray(searchOptions.designation)) {
      searchOptions.designation = [searchOptions.designation]
    }

    if (searchOptions.organization_type && !Array.isArray(searchOptions.organization_type)) {
      searchOptions.organization_type = [searchOptions.organization_type]
    }

    if (searchOptions.committee_type && !Array.isArray(searchOptions.committee_type)) {
      searchOptions.committee_type = [searchOptions.committee_type]
    }

    this.logger.info(`Getting committees for candidate ID: ${candidateId}`)
    this.logger.info('Using options:')
    this.logger.info(JSON.stringify(searchOptions, null, 2))

    const results = await CandidateCommittees.service.getCandidateCommittees(
      candidateId,
      searchOptions
    )
    this.logger.info(`Found ${results.results.length} committees`)
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
