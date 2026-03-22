type Props = {
  data: unknown;
};

export function StructuredData({ data }: Props) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
