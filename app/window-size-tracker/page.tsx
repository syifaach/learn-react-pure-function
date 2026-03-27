//CODE AFTER FIXING
"use client"

import { useEffect, useState } from "react"

const WindowSizeTracker = () => {
    const [width, setWidth] = useState<number | null>(null)
    const [height, setHeight] = useState<number | null>(null)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }

        handleResize()

        window.addEventListener('resize', handleResize) // ✅ same reference

        return () => {
            window.removeEventListener('resize', handleResize) // ✅ same reference
        }
    }, [])

    return (
        <>
            {`width: ${width}, height: ${height}`}
        </>
    )
}

export default WindowSizeTracker

//CODE BEFORE FIXING
// "use client"

// import { useEffect, useState } from "react"

// const WindowSizeTracker = () => {
//     const [width, setWidth] = useState<number | null>(0)
//     const [height, setHeight] = useState<number | null>(0)

//     useEffect(() => {
//         const resize = window.addEventListener('resize', () => {
//             setWidth(window.innerWidth)
//             setHeight(window.innerHeight)
//         })

//         return () => {
//             window.removeEventListener('resize', resize)
//         }
//     }, [])

//     return (
//         <>
//             {`width: ${width}, height: ${height}`}
//         </>
//     )
// }

// export default WindowSizeTracker