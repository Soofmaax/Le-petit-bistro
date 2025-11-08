# Incident Runbook

This runbook provides a checklist for responding to production incidents.

## Detection

- Monitor uptime and response times (APM/monitoring).
- Alert on error rates, 5xx spikes, and unusual resource usage.

## Triage

- Identify scope: single route, entire site, region-specific?
- Check recent deployments and commits.
- Review logs (structured JSON) for error codes and correlation IDs.

## Mitigation

- Rollback to last known good deployment.
- Scale up resources if necessary (temporary).
- Apply feature flags to disable problematic modules.

## Diagnosis

- Examine error traces in APM (e.g., Sentry).
- Verify external dependencies (DB, third-party services).
- Reproduce issues in staging.

## Resolution

- Implement fixes with tests.
- Run load/performance tests where applicable.
- Document root cause and steps taken.

## Postmortem

- What happened, why, lessons learned.
- Action items to prevent recurrence.
- Update documentation and runbooks.

## Contacts

- Product owner: [name]
- Engineering lead: [name]
- On-call: [name / rotation]