interface AISuggestionsProps {
  suggestions: string[]
}

export default function AISuggestions({ suggestions }: AISuggestionsProps) {
  return (
    <div>

      <div className="flex flex-col gap-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="rounded-xl p-4 glass-surface">
            <p>{suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
