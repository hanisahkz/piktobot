'use client'
 
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// TODO: put in a common folder
type PromptHistory = {
  id: number,
  prompt: string,
  image: string
}

export default function Home() { 
  const [promptInput, setPromptInput] = useState("")
  const [promptResult, setPromptResult] = useState<PromptHistory | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const sendPromptRequest = async (prompt: any) => {
    const baseURL = window && new URL(window.location.href);  
    try {
      setIsLoading(true)
      const res = await fetch(
        `${baseURL.origin}/api/text-to-image`,
        {
          method: 'POST',
          body: JSON.stringify({ prompt }),
        }
      );

      if (res) {
        const data: PromptHistory = await res.json();
        if (data) {
          setPromptResult(data);
          setIsLoading(false)
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const getImageResult = () => {
    if (typeof window !== "undefined") {
      const baseURL = window && new URL(window.location.href); 
      return promptResult == null ? "" : (
        <div className="bg-background rounded-md overflow-hidden shadow-sm transition-all aspect-square border-2 border-slate-200 mb-4">
            <img
              src={`${baseURL}api/histories/${promptResult.id}`}
              width={500}
              height={500}
              alt="Alt image"
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
              )}
            />
        </div>
      );
    }
  }

  const renderSkeleton = () => {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[250px] w-[250px] rounded-xl bg-slate-200 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-slate-200 w-full" />
          <Skeleton className="h-4 w-[200px] bg-slate-200 w-full" />
          <Skeleton className="h-4 w-[200px] bg-slate-200 w-full" />
        </div>
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
              <Button type="submit" size="icon" className="bg-cf-orange-1 absolute w-8 h-8 top-3 right-3" onClick={() => sendPromptRequest(promptInput)}>
                <ArrowUp className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </section>
        <section>
          <div style={{marginTop:'45px'}}>
            {isLoading ? renderSkeleton() : getImageResult()}
          </div>
        </section>
      </div>
  </main>
  );
}
