interface JsonLdProps {
  type: string
  data: Record<string, unknown>
  id?: string
}

function escapeHtml(json: string) {
  return json
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029")
}

function buildJson(type: string, data: Record<string, unknown>) {
  return escapeHtml(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": type,
      ...data,
    }),
  )
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
