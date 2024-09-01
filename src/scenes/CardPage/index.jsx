import React, { useState } from 'react'
import ShowcaseCard from '../../components/ShowcaseCard'
import Blob from '../../components/Blob'

const CardPage = () => {
    const [isAnimationSupported, setIsAnimationSupported] = useState(true);
  return (
    <div className="HomePage">
      <ShowcaseCard></ShowcaseCard>
    {!isAnimationSupported ? (
      <>
        <Blob className="blob-1" />
        <Blob className="blob-2" />
      </>
    ) : (
      <>
        <Blob className="blob-1 animate-blob-1" />
        <Blob className="blob-2 animate-blob-2" />
      </>
    )}
    
    </div>
  )
}

export default CardPage