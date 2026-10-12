import { describe, expect, it } from 'vitest';
import {
  validateLocators,
  validateProject,
  validateScope,
} from './audit-rules.mjs';

const nationalSource = {
  title: 'Agency page',
  organization: 'Agency',
  url: 'https://agency.gov.ph/page',
  type: 'national_government',
};

describe('validateScope', () => {
  it('treats a missing scope as local', () => {
    expect(validateScope({})).toEqual([]);
  });

  it('rejects unknown scopes', () => {
    expect(validateScope({ scope: 'regional' })).toHaveLength(1);
  });

  it('requires a national source for national_applicable records', () => {
    expect(
      validateScope({
        scope: 'national_applicable',
        provenance: {
          sources: [{ ...nationalSource, type: 'other_public_source' }],
        },
      })
    ).toHaveLength(1);
    expect(validateScope({ scope: 'national_applicable' })).toHaveLength(1);
    expect(
      validateScope({
        scope: 'national_applicable',
        provenance: { sources: [nationalSource] },
      })
    ).toEqual([]);
    expect(
      validateScope({
        scope: 'national_applicable',
        provenance: {
          sources: [
            { ...nationalSource, type: 'official_government_publication' },
          ],
        },
      })
    ).toEqual([]);
  });
});

describe('validateLocators', () => {
  it('ignores records that do not contain figures', () => {
    expect(
      validateLocators({ provenance: { sources: [nationalSource] } })
    ).toEqual([]);
  });

  it('requires a locator on every source when containsFigures is true', () => {
    const record = {
      containsFigures: true,
      provenance: {
        sources: [
          { ...nationalSource, locator: 'Table 2' },
          { ...nationalSource, locator: ' ' },
          nationalSource,
        ],
      },
    };
    expect(validateLocators(record)).toEqual([
      'source 2 needs a locator (containsFigures)',
      'source 3 needs a locator (containsFigures)',
    ]);
  });

  it('requires at least one source', () => {
    expect(validateLocators({ containsFigures: true })).toHaveLength(1);
  });
});

describe('validateProject', () => {
  const valid = {
    containsFigures: true,
    project: {
      name: 'Bridge repair',
      implementingAgency: 'DPWH Example DEO',
      status: 'completed',
      location: 'Barangay Example',
      amount: {
        text: 'P2 million',
        value: 2000000,
        statement: 'costing P2 million',
      },
    },
  };

  it('accepts a complete record without a contractor', () => {
    expect(validateProject(valid)).toEqual([]);
  });

  it('flags missing fields, a non-numeric amount and missing containsFigures', () => {
    const errors = validateProject({
      project: { ...valid.project, name: '', amount: { text: 'P2 million' } },
    });
    expect(errors).toEqual(
      expect.arrayContaining([
        'project.name is required',
        'project.amount needs text, a numeric value and the source statement',
        'project records must set containsFigures to true',
      ])
    );
  });

  it('rejects an empty contractor instead of publishing a blank name', () => {
    expect(
      validateProject({
        ...valid,
        project: { ...valid.project, contractor: ' ' },
      })
    ).toHaveLength(1);
  });

  it('requires a project object', () => {
    expect(validateProject({})).toHaveLength(1);
  });
});
