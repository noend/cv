interface SectionHeadingProps {
  id?: string
  title: string
}

export function SectionHeading(
  { id, title }: SectionHeadingProps) {  
    return (    
    <h2 id={id} className="text-xl text-shadow-md shadow-gray-300/60 font-bold mb-3 print:text-lg border-b pb-1 print:text-shadow-none">
      {title}
    </h2>
  )
}
