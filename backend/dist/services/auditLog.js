const events = [];
export function writeAuditLog(event) {
    events.unshift({ timestamp: new Date().toISOString(), ...event });
    if (events.length > 200)
        events.pop();
}
export function getAuditLogs() {
    return events;
}
