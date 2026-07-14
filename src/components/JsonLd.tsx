interface JsonLdProps {
  type: string
  data: Record<string, unknown>
  id?: string
}

function buildJson(type: string, data: Record<string, unknown>) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  })
}

export default function JsonLd({ type, data, id }: JsonLdProps) {
  return (
    <script
      id={id ?? `schema-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: buildJson(type, data) }}
    />
  )
}

export function JsonLdGraph({ graph, id }: { graph: Record<string, unknown>[]; id?: string }) {
  return (
    <script
      id={id ?? "schema-graph"}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  )
}
