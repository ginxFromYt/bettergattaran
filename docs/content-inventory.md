# Phase 2 content inventory

Inventory date: 2026-09-22

## Current content model

- Top-level service and government categories are defined in `src/data/*.yaml`.
- Each registered category reads a `content/**/index.yaml` file.
- Markdown pages may have a same-name JSON companion. The loader currently treats that JSON as untyped placeholder data; it has no defined source, verification-date, effective-date, or status fields.
- Government and service document routes already support new Markdown pages without a new page component. A category must be registered in `src/data/yamlLoader.ts`.
- The government category list contains several visible categories with no registered or populated index. Their category pages therefore show no records and no explicit empty state.
- The service indexes advertise many procedures for which no Gattaran-specific Markdown exists. Existing descriptions must not be treated as proof that the municipality offers those services in the described form.

## Visible placeholders and pending areas

- Municipal office structure, office heads, locations, contacts, and hours
- Vice mayor and Sangguniang Bayan membership
- Emergency and public-safety contacts
- Local ordinances, resolutions, consultations, notices, projects, budgets, procurement records, and service procedures
- Gattaran-specific requirements, fees, processing times, schedules, and eligibility rules
- A source inventory and visible provenance information

The empty `content/services/business/rent-stalls-in-public-markets.md` file is indexed but contains no publishable information.

## Inherited locality-specific files

These 15 Markdown files contain Lapu-Lapu or Cebu-specific material and remain subject to runtime suppression:

- `business/apply-for-barangay-clearance-and-mayors-business-permits.md`
- `business/join-trade-fairs-business-expos-or-tourism-promotions.md`
- `business/renew-permits-and-pay-local-business-taxes.md`
- `education/access-educational-support-programs-from-the-lgu.md`
- `education/apply-for-local-scholarships.md`
- `education/enroll-children-in-lgu-daycare-or-preschool-programs.md`
- `education/learn-about-supplementary-activities-for-schools-in-your-area.md`
- `garbage-waste-disposal/check-garbage-collection-schedules-and-request-pickup.md`
- `garbage-waste-disposal/learn-proper-waste-segregation-and-disposal-methods.md`
- `garbage-waste-disposal/report-illegal-dumping-or-waste-management-violations.md`
- `garbage-waste-disposal/request-special-waste-collection-hazardous-materials-electronics.md`
- `health-services/access-maternal-care-and-child-immunization.md`
- `health-services/get-free-check-ups-basic-medicines-and-vaccines.md`
- `health-services/go-to-the-local-hospital-for-treatment-or-confinement.md`
- `health-services/join-health-programs-nutrition-dengue-control-tb-treatment.md`

## Phase 2 implementation boundary

The authoritative sources located in this pass support a municipality profile, the current PSGC barangay list and population context, one current elected-official fact, and links to official public-record repositories. They do not support local service procedures, emergency contacts, a complete office directory, or other officials. Those areas remain unpublished or explicitly pending.
