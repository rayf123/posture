// import dynamic from 'next/dynamic'

// const CamTest = dynamic(() => import('../../components/CamTest.client'), { ssr: false })
import VideoCall from "../components/VideoCall"

export default function PosePage() {
  return (
    <div>
      <h1>Pose Estimation Page</h1>
      {/* <CamTest /> */}
    </div>
  )
}