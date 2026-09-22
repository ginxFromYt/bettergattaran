import type { ContentProvenance as ContentProvenanceData } from '../../lib/markdownLoader';

interface ContentProvenanceProps {
  provenance?: ContentProvenanceData;
}

export default function ContentProvenance({
  provenance,
}: ContentProvenanceProps) {
  if (!provenance) return null;

  const isVerified = provenance.status === 'verified';

  return (
    <aside
      aria-label="Content verification"
      className="mt-8 border-t border-gray-200 pt-5 text-sm text-gray-600"
    >
      <p className="font-semibold text-gray-900">
        {isVerified
          ? 'Verified public information'
          : 'Information pending verification'}
      </p>
      {provenance.verifiedAt && (
        <p className="mt-1">
          Last verified:{' '}
          <time dateTime={provenance.verifiedAt}>{provenance.verifiedAt}</time>
        </p>
      )}
      {provenance.asOf && (
        <p className="mt-1">
          Information effective/as of:{' '}
          <time dateTime={provenance.asOf}>{provenance.asOf}</time>
        </p>
      )}
      {provenance.sources.length > 0 && (
        <div className="mt-3">
          <p className="font-medium text-gray-900">
            {provenance.sources.length === 1 ? 'Source' : 'Sources'}
          </p>
          <ul className="mt-1 space-y-1">
            {provenance.sources.map(source => (
              <li key={`${source.organization}-${source.url}`}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-700 underline underline-offset-2 hover:text-primary-900"
                >
                  {source.title}
                </a>{' '}
                <span>— {source.organization}</span>
                {source.asOf && (
                  <span>
                    {' '}
                    (as of <time dateTime={source.asOf}>{source.asOf}</time>)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
