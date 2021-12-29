import useSWRImmutable from 'swr/immutable'

const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"


const DefinitionSection = ({ meaning }) => {
  return (
    <div className="py-2">
      <span className="font-semibold pt-2">
        {meaning.partOfSpeech}
      </span>
      <ul className="list-disc pl-4">
        {
          meaning.definitions.map((definition, ind) => (
            <li key={ind}>
              <span>{definition.definition}</span>
              {
                definition.example && (
                  <div className="pl-2">
                    <span className="italic text-gray-600">{definition.example}</span>
                  </div>
                )
              }
              
            </li>
          ))
        }
      </ul>
    </div>
  )
}


const WordInfo = ({ word }) => {
  const cleanWord = word.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")

  const collate = (data) => {
    let final = []
    data.forEach((entry) => {
      final = final.concat(entry.meanings)
    })
    return final
  }

  const { data } = useSWRImmutable(baseURL + cleanWord)
  return (
    <div className="bg-zinc-50 w-64 pb-2 max-h-[24rem] text-xs overflow-y-auto font-sans rounded-xl shadow-2xl">
      <ul className="flex flex-row justify-between rounded-t-xl font-semibold text-sm cursor-pointer">
        <li className="basis-1/2 rounded-tl-xl bg-gradient-to-b from-slate-50 to-white">
          <span className="flex flex-row justify-center">Modern</span>
        </li>
        <li className="basis-1/2 bg-slate-100 rounded-tr-xl">
          <span className="flex flex-row justify-center">1933</span>
        </li>
      </ul>
      {
        data
          ? ( 
            data.length > 0
              ? (
                <ul className="divide-y-2 px-4">
                  {
                    collate(data).map((meaning, ind) => <DefinitionSection key={ind} meaning={meaning} />)
                  }
                </ul>
              ) : (
                <span className="pl-2">No definitions found.</span>
              )
          ) : (
            <span className="pl-2">Loading...</span>
          )
      }
    </div>
  )
}

export default WordInfo
