import Word from 'components/PageDisplay/Word'
import Toolbar from 'components/PageDisplay/Toolbar'
import PageInput from 'components/PageDisplay/PageInput'
import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'debounce'

const PageDisplay = ({ pageNumber, text }) => {
  const [edit, setEdit] = useState(false)
  const [currentText, setCurrentText] = useState(text)
  const [end, setEnd] = useState(text.length)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const send = useCallback(
    debounce(currentText => {
      fetch(`/api/pages/${pageNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        mode: 'cors',
        credentials: 'same-origin',
        body: currentText
      })
    }, 5000),
    []
  )

  useEffect(() => {
    send(currentText)
  }, [currentText, send])

  const handleEdit = () => {
    setEdit(!edit)
    setEnd(currentText.length)
  }


  return (
    <div className="rounded-lg bg-orange-100 px-8 pb-8 pt-2 divide-y-2 divide-orange-200 w-[404px]">
      <Toolbar edit={edit} handleEdit={handleEdit}  />
      {
        edit 
          ? <PageInput text={currentText} setText={setCurrentText} end={end} />
          : (
            <div className="flex-col font-serif break-words pt-6">
              {
                currentText.split("\n").map((item, idx) => (
                  <div key={idx} className="flex flex-row justify-between">
                    {
                      item.split(" ").map((word, idy) => (
                        <Word key={idy} text={word} />
                      ))
                    }
                  </div>
                ))
              }
            </div>
          )
      }
    </div>
  )
}

export default PageDisplay
