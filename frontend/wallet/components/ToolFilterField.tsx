"use client";

import * as React from 'react'
import { cn } from "@/lib/utils"

import { Check, X, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge";


export type OptionType = {
    label: string;
    value: string;
}

interface Props {
    title: string;
    options: OptionType[];
    selected: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
    className?: string;
}

const ToolFilterField = React.forwardRef(
    ({ title, options, selected, onChange, className }: Props, forwardedRef: React.ForwardedRef<any>) => {
        const [open, setOpen] = React.useState(false)

        const handleUnselect = (item: string) => {
            onChange(selected.filter((i) => i !== item))
        }

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={forwardedRef}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between items-center h-full"
                        onClick={() => setOpen(!open)}
                    >
                        <div className='flex flex-row items-center gap-2'>
                            <p className='font-semibold'>{title}</p>
                            {(selected.length > 0 && !open) && <Badge
                                variant="outline"
                                className='font-normal'
                            >
                                {selected.length}
                            </Badge>}
                        </div>
                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                    <Command className={className}>
                        {options.length > 10 && <CommandInput placeholder="Search..." />}
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup className='max-h-64 overflow-auto'>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => {
                                        onChange(
                                            selected.includes(option.value)
                                                ? selected.filter((item) => item !== option.value)
                                                : [...selected, option.value]
                                        )
                                        setOpen(true)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selected.includes(option.value) ?
                                                "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                    <div className={cn("flex gap-1 flex-wrap p-2 border-t", selected.length === 0 && "hidden")}>
                        {selected.map((item) => (
                            <Badge
                                variant="secondary"
                                key={item}
                                className="cursor-pointer select-none hover:border hover:border-black"
                                onClick={() => handleUnselect(item)}
                            >
                                {options.find(option => option.value === item)?.label}
                                <X className="ml-1 h-3 w-3 text-muted-foreground" />
                            </Badge>
                        ))}
                    </div>
                </PopoverContent>
            </Popover >
        )
    }
);

ToolFilterField.displayName = 'ToolFilterField';

export default ToolFilterField;