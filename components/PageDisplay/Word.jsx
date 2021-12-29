import { useState, useRef, useEffect } from "react"
import WordInfo from "components/PageDisplay/WordInfo"


const Word = ({ text }) => {
  const wrapperRef = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  return (
    <div className="relative">
      <span ref={wrapperRef} className={`cursor-pointer ${open ? "bg-yellow-400" : "bg-none"}`} onClick={(event) => {setOpen(!open)}}>
        {text + " "}
      </span>
      {
        open && (
          <div className="absolute -top-4 -right-[265px] z-50">
            <WordInfo word={text} />
          </div>
        )
      }
    </div>
  )
}

export default Word
