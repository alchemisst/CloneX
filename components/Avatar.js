import React from 'react'

export default function Avatar({src}) {
  return (
    <div className="rounded-full overflow-hidden w-12">
    <img src={src}/>
    </div>
    )
}
