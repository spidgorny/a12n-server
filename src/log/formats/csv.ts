import { eventTypeString, LogEntry } from '../types';

export default function csv(log: LogEntry[]): string {

  const header = 'time,eventType,ip,userAgent\n';
  return header + log.map( entry => {

    return [
      entry.time.toISOString(),
      eventTypeString.get(entry.eventType),
      entry.ip,
      entry.userAgent
    ];

  }).join('\n');

}
