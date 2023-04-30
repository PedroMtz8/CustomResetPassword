import { Input, FormLabel, FormControl } from "@chakra-ui/react";
import { useRef, useState } from "react";

interface CustomInputProps {
    id: string,
    label: string,
    type: "text" | "password" | "email"
}

export default function CustomInput({ id, label, type }: CustomInputProps) {
    const [value, setValue] = useState("");
    const inputRef = useRef<any>(null)
    return (
        <FormControl position="relative" >
            <FormLabel htmlFor={id}
                position="absolute"
                sx={{
                    position: "absolute",
                    left: "4",
                    display: "flex",
                    h: "100%",
                    alignItems: "center",
                    transform: value ? "translateY(-1.2rem)" : "translateY(0)",
                    fontSize: value ? "12px" : "16px",
                    color: value ? "black" : "gray.500",
                    transition: "all 0.2s",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            >
                {label}
            </FormLabel>
            <Input
                placeholder="  "
                ref={inputRef}
                onChange={(e) => setValue(e.target.value)}
                name={id}
                id={id}
                h="60px"
                borderColor="gray.400"
                type={type}
            />
        </FormControl>
    );
}
