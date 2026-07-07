interface AuditEvent {
  timestamp: string;
  actor: string;
  action: string;
  metadata?: unknown;
}

const events: AuditEvent[] = [];

export function writeAuditLog(event: Omit<AuditEvent, 'timestamp'>) {
  events.unshift({ timestamp: new Date().toISOString(), ...event });
  if (events.length > 200) events.pop();
}

export function getAuditLogs() {
  return events;
}
