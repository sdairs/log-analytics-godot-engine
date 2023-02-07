export type ErrorPerParamQueryData = {
  hour: Date
  total: number
} & {
  [Param in ErrorParamType]?: string
}

export type ErrorPerParam = { name: string; value: number }[]

const ALL_ERROR_PARAMS = [
  'os_name',
  'os_proc_count',
  'os_proc_name',
  'os_video_adapter_driver_name',
] as const

type ErrorParamTuple = typeof ALL_ERROR_PARAMS

export type ErrorParamType = ErrorParamTuple[number]

export function isErrorParam(
  errorParam: string | string[] | undefined
): errorParam is ErrorParamType {
  return ALL_ERROR_PARAMS.includes(errorParam as ErrorParamType)
}

export const ERROR_PARAM_OPTIONS: { text: string; value: ErrorParamType }[] = [
  {
    text: 'OS',
    value: 'os_name',
  },
  {
    text: 'CPU Cores',
    value: 'os_proc_count',
  },
  {
    text: 'CPU Model',
    value: 'os_proc_name',
  },
  {
    text: 'GPU Vendor',
    value: 'os_video_adapter_driver_name',
  },
]
