'use client'

import { useState } from "react"
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useImageQuery } from "./hooks/useImageQuery";

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

  return (
    <main className="flex flex-col items-center gap-6 w-full max-w-3xl mx-auto">
      <div className="relative w-full mt-6">
        <section>
          <Card className="w-full max-w-2xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <Textarea
                  id="promptInputArea"
                  placeholder="Enter your prompt..."
                  className="min-h-[100px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <Button onClick={() => handlePrompt()}>Find image</Button>
                </div>
              </div>
            </div>
            </CardContent>
          </Card>
        </section>
        <section>
          <div className="mt-6">
            <div className="p-4">
              { promptInput && (
                <div>
                  <h3 className="text-lg font-medium truncate">Prompt Area</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {promptInput}
                  </p>
                </div>
              )}
            </div>
            {isLoading ? "Fetching data...." : getPromptResult(data)}
          </div>
        </section>
      </div>
  </main>
  );
}
