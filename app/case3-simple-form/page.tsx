"use client"

import React, { useState } from "react"

const SimpleForm = () => {
    const [values, setValues] = useState({
        name: "", email: ""
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <>
            <input className="border-2" placeholder="input nama" name="name" id="name" value={values.name} onChange={onChange} />
            <input className="border-2" placeholder="input email" name="email" id="email" value={values.email} onChange={onChange} />
            <br />

            <div>
                {
                    `name => ${values.name}, email => ${values.email}`
                }
            </div>
        </>
    )
}

export default SimpleForm