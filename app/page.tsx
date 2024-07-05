'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const handlePrompt = () => alert("TODO!")

  return (
    <main className="flex flex-col items-center gap-6 w-full max-w-3xl mx-auto">
      <div className="relative w-full mt-6">
        <section>
          <Card className="w-full max-w-2xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <Textarea
                  placeholder="Enter your prompt..."
                  className="min-h-[100px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm"
                />
                <div className="flex justify-end mt-2">
                  <Button onClick={() => handlePrompt()}>Send</Button>
                </div>
              </div>
            </div>
            </CardContent>
          </Card>
        </section>
        <section>
          {/* Hardcoding data using API: https://collectionapi.metmuseum.org/public/collection/v1/objects/98 */}
          <div className="mt-6">
            Place for output
          </div>
        </section>
      </div>
    </main>
  );
}
