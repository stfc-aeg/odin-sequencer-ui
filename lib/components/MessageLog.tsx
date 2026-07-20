import { useEffect, useRef, useState, useCallback } from 'react'
import { OdinEventLog, useAdapterEndpoint, type Log } from '@dssg/odin-react'
import { SequencerTypes } from './EndpointTypes';

interface MessageLogProps {
  endpoint_name: string;
  endpoint_url: string;
  poll_interval: number;
}
const POLL_INTERVAL_MS = 1000

const MessageLog = ({ endpoint_name, endpoint_url, poll_interval } : MessageLogProps) => {

  const sequencerEndpoint = useAdapterEndpoint<SequencerTypes>(endpoint_name, endpoint_url, poll_interval);

  const [events, setEvents] = useState<Log[]>([])
  const lastTimestampRef = useRef<string | null>(null)

  // Assuming endpoint.data looks like: { value: Log[] }
  const latestLogs = (sequencerEndpoint.data as { value?: Log[] } | undefined)?.value ?? []

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
      refreshRate={POLL_INTERVAL_MS}
      displayHeight="500px"
    />
  )
}

export default MessageLog