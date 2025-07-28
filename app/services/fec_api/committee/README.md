# Committee Service

This service provides access to FEC committee data through various committee endpoints.

## Available Endpoints

### Committee Totals

Get financial totals for a specific committee aggregated by two-year cycle.

**Endpoint**: `/v1/committee/{committee_id}/totals/`

## Usage

```typescript
import { CommitteeService } from '#services/fec_api/committee/committee_service'

const service = new CommitteeService()

// Get all totals for a committee
const totals = await service.getCommitteeTotals('C00123456')

// Get totals for specific cycles
const totals = await service.getCommitteeTotals('C00123456', {
  cycle: [2024, 2022],
  per_page: 50,
})

// Get totals with sorting
const totals = await service.getCommitteeTotals('C00123456', {
  sort: '-receipts',
  sort_hide_null: true,
})
```

## Available Options for Committee Totals

### Pagination

- `page`: Page number (1-100)
- `per_page`: Results per page (1-100)

### Time-based Filters

- `cycle`: Array of election cycle years

### Sorting

- `sort`: Sort field (default: -cycle)
- `sort_hide_null`: Hide null values on sorted column
- `sort_null_only`: Filter out rows having sort column that is non-null
- `sort_nulls_last`: Sort null values last

## Response Structure

The service returns a `FecApiResponse<CommitteeTotals>` with the following structure:

```typescript
{
  pagination: {
    count: number
    page: number
    pages: number
    per_page: number
  } | null
  results: CommitteeTotals[]
}
```

Each `CommitteeTotals` includes:

- Committee identification (ID, name, type, designation)
- Financial totals (receipts, disbursements, contributions, etc.)
- Filing information (frequency, dates, reports)
- Cycle information

## Future Endpoints

This service is designed to accommodate additional committee endpoints as they are implemented:

- Committee details
- Committee reports
- Committee filings
- Committee candidates
- Committee contributors
- Committee disbursements
