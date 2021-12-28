import TextareaAutosize from 'react-textarea-autosize'
import { useEffect } from 'react'
import { useRef } from 'react'

const PageInput = ({ text, setText, end}) => {
  const textRef = useRef(null)

  useEffect(() => {
    textRef.current.focus()
    textRef.current.setSelectionRange(end, end)
  }, [end])

  return (
    <TextareaAutosize
      ref={textRef}
      className="bg-transparent w-full pt-6 outline-none overflow-hidden resize-none font-serif" 
      value={text}
      onChange={(event) => {setText(event.target.value)}}
    />
  )
}


export default PageInput
