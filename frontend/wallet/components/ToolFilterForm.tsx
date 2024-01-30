"use client"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import ToolFilterField from "./ToolFilterField"
import { UseFormReturn } from "react-hook-form";

interface ToolFilterFormProps {
    form: UseFormReturn<{
        tags: string[];
    }, any, undefined>;
}

export function ToolFilterForm({ form }: ToolFilterFormProps) {
    return (
        <Form {...form}>
            <form className="space-y-8">
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ToolFilterField
                                    title="Tags"
                                    selected={field.value}
                                    options={[
                                        {
                                            value: "next.js",
                                            label: "Next.js",
                                        },
                                        {
                                            value: "sveltekit",
                                            label: "SvelteKit",
                                        },
                                        {
                                            value: "nuxt.js",
                                            label: "Nuxt.js",
                                        }
                                    ]}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}