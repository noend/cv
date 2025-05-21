interface SectionHeadingProps {
  id?: string
  title: string
}

export function SectionHeading({ id, title }: SectionHeadingProps) {
  return (
    <h2 id={id} className="text-xl font-bold mb-3 print:text-lg border-b pb-1">
      {title}
    </h2>
  )
}
