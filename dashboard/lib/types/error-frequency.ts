export type ErrorFrequencyQueryData = {
  event_type: string
  hour: string
  total: number
}

export type ErrorFrequency = { hour: string; total: number }[]
