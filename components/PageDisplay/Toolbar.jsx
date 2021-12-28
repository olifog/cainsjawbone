
import Image from "next/image"

const ToolbarItem = ({ name, icon, handleClick, background }) => {
  return (
    <button className={`flex items-center justify-center w-8 h-8 p-1 rounded-full ${background}`} onClick={handleClick}>
      <Image alt={name} src={icon} width="100" height="100" />
    </button>
  )
}

const Toolbar = ({ edit, handleEdit }) => {
  return (
    <div className="flex flew-row justify-center items-center h-8 pb-2">
      <ToolbarItem background={edit ? "bg-orange-200" : "bg-none"} name="edit" icon="/edit.svg" handleClick={() => {handleEdit()}} />
    </div>
  )
}

export default Toolbar
