import { Popover } from '@headlessui/react'
import { presetSchemas } from '@tinybirdco/mockingbird'
import { TextInput } from '@tremor/react'
import { useRef, useState } from 'react'
import useAuth from '../lib/hooks/use-auth'
import { HostType } from '../lib/types/credentials'
import { cx } from '../lib/utils'
import { createWorker, startWorker, stopWorker } from '../lib/workerBuilder'

import { CogIcon, PauseIcon, PlayIcon } from './Icons'

export default function MockingbirdWidget() {
  const { token: authToken, host: authHost } = useAuth()
  const [token, setToken] = useState(authToken ?? '')
  const [host, setHost] = useState(authHost ?? '')
  const [eps, setEPS] = useState('10')
  const [limit, setLimit] = useState('-1')
  const worker = useRef<Worker>()
  const [isGenerating, setIsGenerating] = useState(false)

  const onGenerateClick = async () => {
    if (isGenerating) {
      if (!worker.current) return

      stopWorker(worker.current)
      worker.current = undefined
      setIsGenerating(false)
    } else {
      const endpoint =
        host === HostType.Eu ? 'eu_gcp' : host === HostType.Us ? 'us_gcp' : host

      if (!endpoint || !token) return

      const parsedEPS = parseInt(eps) || 1
      const parsedLimit = parseInt(limit) || -1

      worker.current = createWorker({
        schema: {
          "log_level": {
              "type": "values_weighted",
              "params": {
                  "values": [
                      "INFO",
                      "WARN",
                      "ERROR"
                  ],
                  "weights": [
                      84,
                      13,
                      3
                  ]
              }
          },
          "event_type": {
              "type": "values_weighted",
              "params": {
                  "values": [
                      "LOAD_SCENE",
                      "GAME_START",
                      "GAME_END"
                  ],
                  "weights": [
                      98,
                      1,
                      1
                  ]
              }
          },
          "os_distribution": {
              "type": "values_weighted",
              "params": {
                  "values": [
                      "macOS",
                      "Windows",
                      "Linux"
                  ],
                  "weights": [
                      15,
                      83,
                      2
                  ]
              }
          },
          "os_executable_path": {
              "type": "values",
              "params": {
                  "values": [
                      "/private/var/folders/37/5j3xhf1x78b7g8d6_tzv8y9m0000gn/T/AppTranslocation/790DB75F-19AA-45FA-BBE0-7412E711E65C/d/Godot.app/Contents/MacOS/Godot"
                  ]
              }
          },
          "os_game_run_time": {
              "type": "range",
              "params": {
                  "min": 100,
                  "max": 200000
              }
          },
          "os_is_debug": {
              "type": "values_weighted",
              "params": {
                  "values": [
                      1,
                      0
                  ],
                  "weights": [
                      85,
                      15
                  ]
              }
          },
          "os_language": {
              "type": "values_weighted",
              "params": {
                  "values": [
                      "en",
                      "es"
                  ],
                  "weights": [
                      70,
                      30
                  ]
              }
          },
          "os_model_name": {
              "type": "values",
              "params": {
                  "values": [
                      "GenericDevice"
                  ]
              }
          },
          "os_name": {
              "type": "values_weighted",
              "params": {
                  "values": [
                      "macOS",
                      "Windows",
                      "Linux"
                  ],
                  "weights": [
                      15,
                      83,
                      2
                  ]
              }
          },
          "os_proc_count": {
              "type": "values_weighted",
              "params": {
                  "values": [
                      4,
                      6,
                      8,
                      12
                  ],
                  "weights": [
                      20,
                      30,
                      30,
                      20
                  ]
              }
          },
          "os_proc_name": {
              "type": "values_weighted",
              "params": {
                  "values": [
                      "Apple M1 Pro",
                      "Apple M1",
                      "AMD5700x",
                      "i7 9700K"
                  ],
                  "weights": [
                      5,
                      5,
                      45,
                      45
                  ]
              }
          },
          "os_thread_caller": {
              "type": "range",
              "params": {
                  "min": 5046947661498600000,
                  "max": 5046947661498900000
              }
          },
          "os_time": {
              "type": "timestamp_now"
          },
          "os_unique_id": {
              "type": "uuid"
          },
          "os_version": {
              "type": "intString"
          },
          "os_video_adapter_driver_name": {
              "type": "values_weighted",
              "params": {
                  "values": [
                      "Apple",
                      "AMD",
                      "nVidia",
                      "intel"
                  ],
                  "weights": [
                      5,
                      40,
                      40,
                      15
                  ]
              }
          },
          "os_video_adapter_driver_version": {
              "type": "intString"
          },
          "event_data": {
              "type": "values",
              "params": {
                  "values": [
                      "{\"match_id\":\"MTY3NTgwODk1NS44NjQ4NENQUTI0VjlEN04=\"}"
                  ]
              }
          }
      },
        endpoint,
        datasource: 'logs',
        token,
        eps: parsedEPS,
        limit: parsedLimit < 0 && parsedLimit !== -1 ? -1 : parsedLimit,
      })

      if (!worker.current) return

      startWorker(worker.current)
      setIsGenerating(true)
    }
  }

  return (
    <div className="flex items-center gap-0.5">
      <p className="flex items-center bg-blue-500 text-white font-bold text-sm px-4 py-2 h-10 rounded-tl rounded-bl">
        Generate data
      </p>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={cx(
                'text-white p-3 bg-blue-500 hover:bg-blueHover1',
                open && 'bg-blueHover2 hover:bg-blueHover2'
              )}
            >
              <CogIcon />
            </Popover.Button>

            <Popover.Panel className="z-[2] absolute w-[213.3px] top-11 -right-[42.15px] flex flex-col shadow gap-2 bg-white rounded p-2">
              <TextInput
                value={token}
                onChange={e => setToken(e.target.value)}
                placeholder="Token"
              />
              <TextInput
                value={host}
                onChange={e => setHost(e.target.value)}
                placeholder="Host"
              />
              <TextInput
                value={eps}
                onChange={e => setEPS(e.target.value)}
                placeholder="EPS"
              />
              <TextInput
                value={limit}
                onChange={e => setLimit(e.target.value)}
                placeholder="Limit"
              />
            </Popover.Panel>
          </>
        )}
      </Popover>

      <button
        className={cx(
          'p-3 text-white bg-blue-500 hover:bg-blueHover1 rounded-tr rounded-br',
          isGenerating && 'bg-blueHover2 hover:bg-blueHover2'
        )}
        onClick={onGenerateClick}
      >
        {isGenerating ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  )
}
