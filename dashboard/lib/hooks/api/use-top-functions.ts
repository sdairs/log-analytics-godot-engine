import { queryPipe } from '../../api'
import { TopFunctions, TopFunctionsQueryData } from '../../types/top-functions'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'top_functions_api'

async function getTopFunctions(
  date_from?: string,
  date_to?: string
): Promise<TopFunctions> {
  const { data } = await queryPipe<TopFunctionsQueryData>(PIPE_NAME, {
    date_from,
    date_to,
  })

  const topFunctions = data
    .map(({ event_type, total }) => ({
      name: event_type,
      value: total,
    }))
    .sort((a, b) => b.value - a.value)

  return topFunctions
}

export default function useTopFunctions() {
  const { startDate, endDate } = useDateFilter()
  return useQuery([startDate, endDate, PIPE_NAME], getTopFunctions)
}
