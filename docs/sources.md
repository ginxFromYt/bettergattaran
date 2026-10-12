# Source inventory

Last reviewed: 2026-10-12

This inventory records sources considered during Phases 2–3.1. Inclusion here does not make every fact on a source suitable for publication.

## General municipality and statistics

- **Philippine Statistics Authority — Municipality of Gattaran (PSGC).** Accepted. Supports PSGC codes, income class, 2024 Census of Population figure, barangay count, names, classifications, and barangay population values. <https://psa.gov.ph/classification/psgc/barangays/0201513000>
- **Philippine Statistics Authority — PSGC summary.** Accepted for the Region II and Cagayan administrative hierarchy. <https://psa.gov.ph/classification/psgc/summary>
- **PSA Region II — 2024 Regional Social and Economic Trends.** Accepted as a historical statistical cross-check for the 2020 Census figure; the newer PSGC profile is used for current display. <https://rsso02.psa.gov.ph/sites/default/files/rsso2/2024%20RSET.pdf>

## Officials

- **Provincial Government of Cagayan — City and Municipalities.** Accepted for the municipal mayor name and title currently displayed on the provincial directory. The empty mobile and email fields are not published. <https://cagayan.gov.ph/city-and-municipalities/>
- **Provincial Government of Cagayan article dated 13 February 2024.** Rejected for current-official publication because it identifies a prior mayor and is superseded by the current provincial directory. It remains useful only as a dated historical record. <https://cagayan.gov.ph/inphotos-binisita-ng-mga-miyembro-ng-league-of-municipalities-of-the-philippines-lmp-sa-cagayan-si-governor-manuel-mamba-sa-opisina-nito-sa-capitol-main-building-tuguegarao-city-cagayan-ngayong-p/>

## Offices

- No sufficiently complete current Municipality of Gattaran office directory was found. Office names, heads, mandates, locations, numbers, email addresses, and hours remain pending.

## Services

- No authoritative Gattaran-specific citizen charter or current procedure set was found during this pass. National program pages were not republished as local municipal procedures. All inherited service guides remain unpublished from category listings and suppressed on direct legacy routes.

## Emergency

- **Philippine Government eGov PH — PH Emergency Hotlines.** Accepted for the nationwide `911` emergency number. <https://ehotlines.e.gov.ph/>
- **Provincial Government of Cagayan — Citizens' Charter 2024.** Accepted for Gattaran Emergency Hospital (`0995-323-4947`) and Cagayan PDRRMO (`0975-434-8083`). Both appear in the official office directory; the PDRRMO number is also consistent with the official 2022 charter. <https://www.cagayan.gov.ph/wp-content/uploads/2024/04/PGCagayan-Citizens-Charter-2024-edition-final.pdf>
- The proposed Gattaran MDRRMO number `0926-652-6027` was not published because no adequate authoritative current source was located.
- No other Gattaran police, fire, ambulance, rescue, health, or MDRRMO numbers have been published.

## Live weather

- **CIS Mock Backend current-weather endpoint.** Runtime observation source queried using the fixed Gattaran coordinates (`18.054287, 121.970096`); the API currently supplies qualified Gattaran location data, observation time, provider attribution, normalized metrics, nearest-station context, and quality warnings. The frontend always displays the provider returned by the response. <https://cis-mock.ginxproduction.com/api/weather/current?latitude=18.0542870&longitude=121.9700960>
- CORS checks on 23 September 2026 returned `Vary: Origin` but no `Access-Control-Allow-Origin` header for tested local and likely deployment origins. The API must allow the actual Better Gattaran production origin for direct browser requests.

## Transparency

- **Commission on Audit — Annual Audit Reports, Local Government Units.** Accepted as the authoritative repository entry point. No financial figures were summarized. <https://www.coa.gov.ph/reports/annual-audit-reports/aar-local-government-units/>
- No reliably addressable Gattaran-specific Full Disclosure Policy, procurement, ordinance, resolution, or development-plan collection was established during this pass.

## Rejected discovery sources

- Wikipedia and other encyclopedic/third-party municipality profiles: rejected as sole authorities because the underlying primary PSA record is available.
- Unverified Facebook pages, search-result social snippets, business directories, map listings, scraped contact sites, and reposts: rejected because official ownership, currency, or provenance could not be established.
- Third-party pages containing postal codes, land area, contact details, or office lists: rejected pending confirmation from the issuing government organization.

## Phase 4 — National-agency projects (reviewed 2026-10-12)

Pages were opened with an automated web-fetch tool that summarizes page text, so a maintainer should confirm each quoted sentence in a browser before promoting any record to `verified`.

- **DPWH news release, "DPWH Completes P50-M Flood Defense Project in Gattaran, Cagayan" (7 December 2023).** Accepted (`national_government`). Supports the Casicallan Flood Control Project row: 170-meter concrete revetment with hexapods, Barangay Casicallan, 2023 General Appropriations Act, "P50 million". The release names no contractor. <https://dpwh.gov.ph/DPWH/news/31832>
- **DPWH news release, "DPWH Paves Road to Tanglagan Falls in Gattaran, Cagayan" (19 April 2022).** Accepted (`national_government`). Supports two rows: the P35 Million road improvement in Barangay Tanglagan (2020 and 2021 GAA) and the additional P7.1 million road. The release names no contractor and states no fund source for the second project. <https://dpwh.gov.ph/DPWH/news/26309>
- **DPWH Cagayan 1st District Engineering Office, Procurement Monitoring Report, second semester FY 2024, civil works (PDF).** Opened and downloaded, but **no rows published**. The table is a very wide, multi-line layout; project names combine several municipalities (clustered projects) and road names such as "Jct. Gattaran-Cumao" appear in rows that may be outside Gattaran. The report has Approved Budget and Contract Cost columns but no contractor column, and its "Completed" refers to the procurement activity, not the project. Rows need human extraction (see the Phase 4 handoff). <https://dpwh.gov.ph/DPWH/sites/default/files/pmr/pmrsecondsemesterforfy2024dpwh-cagayan-1stdeocivilworks.pdf>
