# Content verification policy

Better Gattaran is an independent, volunteer-led civic information portal. It is not the official website of the Municipality of Gattaran. This policy applies to all municipality-specific content.

## Accepted source hierarchy

Use the strongest available source, in this order:

1. Municipality of Gattaran official pages and public documents
2. Clearly identifiable official Municipality of Gattaran social accounts
3. Official Philippine government sources
4. DILG or BLGS
5. Philippine Statistics Authority or Philippine Standard Geographic Code
6. Commission on Audit
7. DBM or the Full Disclosure Policy Portal
8. Relevant national agencies
9. Provincial Government of Cagayan

Third-party directories, blogs, scraped lists, search snippets, and social reposts can help locate a primary source but cannot be the sole authority for published municipal facts.

## Verification procedure

1. Open the authoritative source and confirm that it identifies Gattaran and the fact being recorded.
2. Check the publication, effective, census, or record date. Do not imply that an old record is current.
3. Compare politically sensitive, emergency, contact, fee, and procedure information with a second authoritative source when practical.
4. Record the source metadata in a companion JSON file.
5. Set `published: true` in the category index only after the page and its sources have been reviewed.
6. Check the rendered page, links, mobile layout, and tests before release.

## Required metadata

Verified Markdown pages use a same-name JSON companion:

```json
{
  "provenance": {
    "status": "verified",
    "verifiedAt": "YYYY-MM-DD",
    "asOf": "YYYY-MM-DD",
    "sources": [
      {
        "title": "Source document or page title",
        "organization": "Issuing organization",
        "url": "https://government.example/page",
        "asOf": "YYYY-MM-DD"
      }
    ]
  }
}
```

`asOf` is optional when the source provides no effective date. Multiple source entries are supported. URLs must use HTTP or HTTPS. The UI shows source links, verification date, and effective date without presenting Better Gattaran as the issuing organization.

## Conflicting or outdated sources

- Prefer the higher-ranked source and the record with the clearest effective date.
- Do not silently reconcile conflicting names, dates, figures, or contacts.
- Withhold the disputed field and record the conflict in `docs/sources.md` until the issuing organizations clarify it.
- Mark stale pages `pending`, remove `published: true`, or replace the outdated statement with a clearly dated historical record.

## Pending information

Pending facts stay out of visible prose. A category may remain visible with the standard pending-verification message. Companion metadata may use `"status": "pending"`, but an index entry must not be marked published until it contains useful, sourced public information.

## Review cadence

- Emergency contacts, elected officials, office contacts, fees, schedules, and procedures: review at least every three months and after a known change.
- Budgets, audit reports, procurement records, and annual statistics: review when the issuing organization publishes a new cycle.
- Administrative identity and barangay lists: review at least annually against the latest PSGC release.
- Every other published municipal page: review at least every six months.

## Political and elected-official content

Use factual names, official titles, and explicit effective dates only. Do not add praise, criticism, campaign material, inferred affiliation, motives, rankings, biographies, or policy characterization unless it is necessary, directly supported, and neutrally stated. Verify current officeholders from an authoritative current record.

## Emergency information

An emergency number or response instruction requires a current official source, a verification date, and preferably a second authoritative confirmation. Never infer a number from another municipality or from an unverified directory. Remove or unpublish a contact immediately if its validity is uncertain.

## Corrections

Contributors should submit a repository issue or pull request containing the disputed statement, authoritative replacement source, source organization, URL, effective date if available, and date checked. Do not include private personal information. A correction follows the same review and test process as new content.
