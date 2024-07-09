'use client'

import { useState } from "react"
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useImageQuery } from "./hooks/useImageQuery";
import { ArrowUp } from "lucide-react";

export default function Home() {
  const [promptInput, setPromptInput] = useState("")
  const handlePrompt = () => alert("TODO!")
  const {
    data,
    isLoading,
    isError
  } = useImageQuery();

  // TODO: Handle data return from API accordingly
  const getPromptResult = (d:any) => {
    console.log("image url: ", d.primaryImage)
    return (
      <Card>
        <CardContent>
          <Image
            src={d.primaryImage}
            width={500}
            height={500}
            alt={d.objectName}
          />
        </CardContent>
      </Card>
    )
  }

  const renderSpinner = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center gap-6 w-full max-w-3xl mx-auto">
      <div className="relative w-full mt-6">
        <section>
          <div className="flex items-start gap-4 pt-5">
            <div className="relative flex-1">
              <Textarea
                placeholder="Type your prompt here..."
                className="w-full p-4 text-lg rounded-md border-2 outline-none focus:border-cf-orange-1 focus:ring-cf-none pr-16"
                rows={3}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
              />
              <Button type="submit" size="icon" className="bg-cf-orange-1 absolute w-8 h-8 top-3 right-3" onClick={() => handlePrompt()}>
                <ArrowUp className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </section>
        <section>
          <div className="mt-6">
            {/* TODO: Evaluate if this is needed */}
            {/* <div className="p-4">
              { promptInput && (
                <div>
                  <h3 className="text-lg font-medium truncate">Prompt Area</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {promptInput}
                  </p>
                </div>
              )}
            </div> */}
            {isLoading ? renderSpinner() : getPromptResult(data)}
          </div>
        </section>
      </div>
  </main>
  );
}
