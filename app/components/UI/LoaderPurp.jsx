import React from 'react'
import { LoaderCircle} from 'lucide-react'

const LoaderPurp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary">
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle  className="animate-spin text-action" size={70} />
      </div>
    </div>
  )
}

export default LoaderPurp