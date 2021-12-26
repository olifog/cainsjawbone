import { SpinnerCircular } from "spinners-react"

const Loading = () => (
  <div className="w-screen h-screen z-40 flex items-center justify-center">
    <SpinnerCircular size={100} thickness={140} speed={100} color="rgba(172, 57, 153, 1)" secondaryColor="rgba(57, 147, 172, 0.23)" />
  </div>
)

export default Loading
