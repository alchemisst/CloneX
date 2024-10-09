import React from 'react'

export default function Layout({children}) {
  return (
<div className="max-w-xl mx-auto border-l border-r border-appBorder min-h-screen">
    {children}
</div>
  )
}
