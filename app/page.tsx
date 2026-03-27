"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState('light')
  let className = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'

  const toggle = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <div>
      <button className="bg-blue-200 border-2 cursor-pointer" onClick={toggle}>toggle theme</button>
      <div className={`w-80 h-80 text-wrap ${className}`} >
        ubah ubah tema
      </div>
    </div>
  );
}
