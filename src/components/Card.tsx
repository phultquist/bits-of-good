import React from 'react'

export default function Card(props: {children: React.ReactNode, smallMargin?: boolean}) {
    return (
        <div className={`flex-none py-4 px-8 bg-white shadow rounded-lg ${props.smallMargin ? "my-4" : "my-10"}`}>
            {props.children}
        </div>
    )
}