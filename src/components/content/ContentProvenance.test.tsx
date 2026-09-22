import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ContentProvenance from './ContentProvenance';

describe('ContentProvenance', () => {
  it('renders multiple authoritative sources and verification dates', () => {
    render(
      <ContentProvenance
        provenance={{
          status: 'verified',
          verifiedAt: '2026-09-22',
          asOf: '2025-07-31',
          sources: [
            {
              title: 'Municipality of Gattaran',
              organization: 'Philippine Statistics Authority',
              url: 'https://psa.gov.ph/example',
            },
            {
              title: 'Official directory',
              organization: 'Provincial Government of Cagayan',
              url: 'https://cagayan.gov.ph/example',
            },
          ],
        }}
      />
    );

    expect(screen.getByText('Verified public information')).toBeInTheDocument();
    expect(screen.getByText('2026-09-22')).toHaveAttribute(
      'datetime',
      '2026-09-22'
    );
    expect(screen.getByText('2025-07-31')).toHaveAttribute(
      'datetime',
      '2025-07-31'
    );
    expect(
      screen.getByRole('link', { name: 'Municipality of Gattaran' })
    ).toHaveAttribute('href', 'https://psa.gov.ph/example');
    expect(screen.getByText('Sources')).toBeInTheDocument();
  });

  it('renders a pending state without fabricating a source', () => {
    render(
      <ContentProvenance provenance={{ status: 'pending', sources: [] }} />
    );

    expect(
      screen.getByText('Information pending verification')
    ).toBeInTheDocument();
    expect(screen.queryByText('Source')).not.toBeInTheDocument();
  });
});
