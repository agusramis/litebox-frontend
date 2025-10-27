"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { system } from "@/theme"

import { ThemeProvider, type ThemeProviderProps } from "next-themes"

export const Provider = (props: ThemeProviderProps) => {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
      >
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
