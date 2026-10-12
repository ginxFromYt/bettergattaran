/**
 * Pure audit rules shared by scripts/audit-content.mjs and its tests.
 * Mirrors the helpers in src/lib/contentGovernance.ts (the audit runs in Node
 * without the TypeScript toolchain, so the constants are repeated here).
 */

export const contentScopes = ['local', 'national_applicable'];
export const nationalSourceTypes = [
  'national_government',
  'official_government_publication',
];

/** Returns error messages (without a file prefix) for scope-related rules. */
export function validateScope(record) {
  const errors = [];
  const scope = record.scope ?? 'local';
  if (!contentScopes.includes(scope)) {
    errors.push(`invalid scope "${scope}"`);
    return errors;
  }
  if (scope === 'national_applicable') {
    const sources = record.provenance?.sources ?? [];
    if (!sources.some(source => nationalSourceTypes.includes(source.type))) {
      errors.push(
        'national_applicable content must cite at least one national_government or official_government_publication source'
      );
    }
  }
  return errors;
}

/** Returns error messages for locator rules on figures-bearing records. */
export function validateLocators(record) {
  const errors = [];
  if (record.containsFigures !== true) return errors;
  const sources = record.provenance?.sources ?? [];
  if (sources.length === 0) {
    errors.push('containsFigures content needs at least one source');
  }
  sources.forEach((source, index) => {
    if (typeof source.locator !== 'string' || !source.locator.trim()) {
      errors.push(`source ${index + 1} needs a locator (containsFigures)`);
    }
  });
  return errors;
}
