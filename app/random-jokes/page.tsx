"use client"

//CODE AFTER FIXING
import { useEffect, useState } from "react"

const RandomJokes = () => {
    const [jokes, setJokes] = useState<{ setup: string, punchline: string }>({ setup: '', punchline: '' })
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const controller = new AbortController()

        fetch('https://official-joke-api.appspot.com/random_joke', { signal: controller.signal })
            .then(res => res.json())
            .then(res => {
                // ✅ Direct update, no unnecessary prev spread
                setJokes({ setup: res?.setup, punchline: res?.punchline })
            })
            .catch(err => {
                // ✅ Ignore abort, store string message
                if (err.name !== 'AbortError') {
                    setError(err?.message ?? 'Something went wrong')
                }
            })
            .finally(() => setLoading(false))

        // ✅ Cancel fetch on unmount
        return () => controller.abort()
    }, [])

    if (loading) return <>loading...</>
    if (error) return <>Error!</>
    return (
        <>
            {`setup: ${jokes.setup}`}
            {`punchline: ${jokes.punchline}`}
        </>
    )
}

export default RandomJokes

//CODE BEFORE FIXING
// import { useEffect, useState } from "react"

// const RandomJokes = () => {
//     const [jokes, setJokes] = useState<{ setup: string, punchline: string }>({ setup: '', punchline: '' })
//     const [loading, setLoading] = useState<boolean>(true)
//     const [error, setError] = useState<string>('')

//     useEffect(() => {
//         fetch('https://official-joke-api.appspot.com/random_joke')
//             .then(res => res.json())
//             .then(res => {
//                 setJokes(prev => ({
//                     ...prev,
//                     setup: res?.setup,
//                     punchline: res?.punchline
//                 }))
//             })
//             .catch(err => setError(err))
//             .finally(() => setLoading(false))
//     }, [])

//     if (loading) return <>loading...</>
//     if (error) return <>Error!</>
//     return (
//         <>
//             {`setup: ${jokes.setup}`}
//             <br />
//             {`punchline: ${jokes.punchline}`}
//         </>
//     )
// }

// export default RandomJokes