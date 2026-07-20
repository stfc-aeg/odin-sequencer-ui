import { useEffect, useRef, useState, useCallback } from 'react'
import { OdinEventLog, useAdapterEndpoint, type Log } from '@dssg/odin-react'
import { SequencerTypes } from './EndpointTypes';

interface MessageLogProps {
  endpoint_name: string;
  endpoint_url: string;
  poll_interval: number;
}

type RawLogTuple = [string, string, string]

// Convert the log_messages data (`[time, msg, level]`) into an odin-react Log for easier integration.
// This function checks its argument parameter for:
// - Is it just the array of messages?
// - If not, is it like { log_messages: messages[] } or { value: messages[] }
// Then it maps those into a Log-like object
const parseLogMessages = (value: unknown): Log[] => {
  const rawMessages = (() => {
    // Check if it's the plain array of messages
    if (Array.isArray(value)) {
      return value
    }
    // Check if it's an object if it's not an array (it should be)
    if (typeof value !== 'object' || value === null) {
      return undefined
    } // Checking the object key, which ought to be log_messages or value
    const candidate = value as Record<string, unknown>
    if (Array.isArray(candidate.log_messages)) {
      return candidate.log_messages
    }
    if (Array.isArray(candidate.value)) {
      return candidate.value
    }
    return undefined
  })()

  if (!Array.isArray(rawMessages)) return []

  return rawMessages.flatMap((entry) => {
    if (!Array.isArray(entry) || entry.length < 3) return []

    const [timestamp, message, level] = entry as RawLogTuple

    return [{
      timestamp,
      message,
      level: level as Log['level']
    }]
  })
}

const MessageLog = ({ endpoint_name, endpoint_url, poll_interval } : MessageLogProps) => {
  const name = endpoint_name + "/log_messages";
  const sequencerEndpoint = useAdapterEndpoint<SequencerTypes>(name, endpoint_url, poll_interval);

  const [events, setEvents] = useState<Log[]>([])
  const lastTimestampRef = useRef<string | null>(null)

  const latestLogs = parseLogMessages(sequencerEndpoint.data)

  const getLatestLogs = useCallback((timestamp: string | null) => {
    return events.filter(
      (event) =>
        !timestamp || new Date(event.timestamp) > new Date(timestamp)
    )
  }, [events])

  useEffect(() => {
    if (!latestLogs.length) return

    setEvents((prev) => {
      const filtered = latestLogs.filter(
        (log) =>
          !prev.some(
            (pLog) =>
              pLog.timestamp === log.timestamp &&
              pLog.message === log.message
          )
      )

      if (!filtered.length) return prev

      lastTimestampRef.current = filtered[filtered.length - 1].timestamp

      return [...prev, ...filtered]
    })
  }, [latestLogs])

  return (
    <OdinEventLog
      events={events}
      getLatestLogs={getLatestLogs}
      refreshRate={poll_interval}
      displayHeight="500px"
    />
  )
}

export default MessageLog