"use client"

import { createIcon } from "@chakra-ui/react"

export const CloseIcon = createIcon({
    displayName: "CloseIcon",
    path: (
        <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="9.35355" y1="0.461036" x2="0.353553" y2="9.46104" stroke="black" />
            <line x1="0.353553" y1="0.353539" x2="9.35355" y2="9.35354" stroke="black" />
        </svg>
    ),
})
