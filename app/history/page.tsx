'use client'

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

// TODO: put in a common folder
type PromptHistory = {
    id: number,
    prompt: string,
    image: string
}

const MAX_DISPLAY_LIMIT_PROMPT: number = 180;

export default function Page() {
    const [isLoading, setIsLoading] = useState(false)
    const [histories, setHistories] = useState<PromptHistory[]>([])
    const [baseURL, setBaseURL] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsLoading(true)
            setBaseURL(window.location.origin);
            fetch(`${baseURL}/api/histories`)
                .then((res) => res.json())
                .then((data) => {
                    setHistories(data as PromptHistory[])
                    setIsLoading(false)
                })
        }
    }, [])
    
    const truncate = (input: String) => input.length > MAX_DISPLAY_LIMIT_PROMPT ? `${input.substring(0, MAX_DISPLAY_LIMIT_PROMPT)}...` : input;

    const renderSpinner = () => {
        return (
          <div className="flex my-52 items-center justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-8 border-orange-500 border-t-transparent" />
          </div>
        )
    }

    return (
        <div>
            { isLoading ? renderSpinner() : (
                <div className="grid grid-cols-4 gap-8 p-10">
                {histories.map((h, index) => (
                    <Sheet key={index}>
                        <SheetTrigger asChild>
                            <div className="bg-background rounded-md overflow-hidden shadow-sm transition-all group-hover:scale-[1.02] border-2 border-slate-200 mb-4">
                                <img
                                    src={`${baseURL}/api/histories/${h.id}`}
                                    alt="Tile image for prompt history"
                                    width={400}
                                    height={250}
                                    className="object-cover w-full hover:scale-105 aspect-[16/10]"
                                />
                                <div className="flex p-4 grid gap-2">
                                <p className="text-wrap ">
                                    {truncate(h.prompt)}
                                </p>
                                </div>
                            </div>
                        </SheetTrigger>
                        <SheetContent side="right" className="min-w-[45%] bg-background shadow-lg">
                            <div className="flex flex-col h-full">
                                <div className="sticky top-0 z-100 flex items-center justify-between gap-4 border-b bg-background py-3">
                                    <h3 className="text-xl font-semibold">Details</h3>
                                </div>
                                <div className="flex-1 overflow-auto pt-4 pb-4">
                                    <div className="mb-5">
                                        <img
                                        src={`${baseURL}/api/histories/${h.id}`}
                                        alt="Tile image for prompt history"
                                        width={400}
                                        height={250}
                                        className="object-cover w-full aspect-video"
                                    />
                                    </div>
                                    <h4 className="text-base font-bold">Prompt</h4>
                                    <div>
                                        <p>{h.prompt}</p>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                ))}
                </div>
            )}
        </div>
    )
}