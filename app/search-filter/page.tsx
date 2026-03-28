"use client"

import React, { useEffect, useState } from "react"

const SearchFilter = () => {
    const [data, setData] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (!searchValue.trim()) {
            setData([])
            setError(null)
            return
        }

        let controller: AbortController
        const debounceInput = setTimeout(() => {
            controller = new AbortController()
            setLoading(true)

            fetch(`https://restcountries.com/v3.1/name/${searchValue}`, { signal: controller.signal })
                .then(async res => {
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    return res.json()
                })
                .then(res => {
                    setError(null)
                    setData(res)
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        setError(null)
                        return
                    };
                    setError(err);
                })
                .finally(() => setLoading(false))
        }, 500)

        return () => {
            clearTimeout(debounceInput)
            controller?.abort()
        }
    }, [searchValue])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchValue(value)
    }

    return (
        <div className="flex flex-col gap-2">
            <input className="border" placeholder="search" name="search" id="search" value={searchValue} onChange={onChange} />
            {loading ? <label>Loading...</label>
                : error ? <label>Something went wrong!</label>
                    : data.map(val => (
                        <label key={val.name.common}>{val.name.common}</label>
                    ))
            }
        </div>
    )
}

export default SearchFilter