import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from 'next/image'

type PromptHistory = {
    id: number,
    prompt: string,
    image: string
}

// TODO: Get data from: localhost:3000/api/histories
const promptHistory: PromptHistory[] = [
    {
        "id": 1,
        "prompt": "cendol at Lake Danatoba",
        "image": "https://i.imgur.com/jdNPFTi.jpeg"
    },
    {
        "id": 2,
        "prompt": "Lorem ipsum dolor sit amet consectetur adipiscing elit felis pulvinar ultrices, dapibus dictumst curabitur leo risus consequat nulla enim quisque taciti, maecenas netus sagittis euismod rutrum est convallis quam luctus. Orci class tellus praesent integer porttitor feugiat dignissim diam nisl suspendisse, tincidunt hac ornare sem convallis bibendum nulla lacinia rutrum mollis, cum porta at sociis vel congue ullamcorper scelerisque nec. Turpis montes praesent massa cursus duis semper non lacinia mus, posuere vel nulla mattis nisi nisl morbi pulvinar, euismod consequat ac justo felis pharetra blandit aptent.",
        "image": "https://i.imgur.com/VO0DshV.jpeg"
    },
    {
        "id": 3,
        "prompt": "Lorem ipsum dolor sit amet consectetur adipiscing elit felis pulvinar ultrices, dapibus dictumst curabitur leo risus consequat nulla enim quisque taciti, maecenas netus sagittis euismod rutrum est convallis quam luctus. Orci class tellus praesent integer porttitor feugiat dignissim diam nisl suspendisse, tincidunt hac ornare sem convallis bibendum nulla lacinia rutrum mollis, cum porta at sociis vel congue ullamcorper scelerisque nec. Turpis montes praesent massa cursus duis semper non lacinia mus, posuere vel nulla mattis nisi nisl morbi pulvinar, euismod consequat ac justo felis pharetra blandit aptent. Nisl leo lobortis felis ullamcorper vivamus sodales pulvinar curae, montes proin turpis iaculis risus purus quisque nascetur massa, ligula conubia blandit vestibulum ut morbi ante. Fermentum pellentesque libero nascetur magna natoque ornare per nullam ligula sapien placerat gravida malesuada, taciti cum aptent curae molestie ultricies sed viverra id nam facilisis. Mollis gravida aenean semper fermentum bibendum dictumst, porttitor vivamus at sed hac dictum nisi, venenatis pharetra facilisis nunc praesent.",
        "image": "https://i.imgur.com/VO0DshV.jpeg"
    },
    {
        "id": 4,
        "prompt": "cendol at Lake Danatoba",
        "image": "https://i.imgur.com/aRpOaYo.png"
    },
    {
        "id": 5,
        "prompt": "Lorem ipsum dolor sit amet consectetur adipiscing elit felis pulvinar ultrices, dapibus dictumst curabitur leo risus consequat nulla enim quisque taciti, maecenas netus sagittis euismod rutrum est convallis quam luctus. Orci class tellus praesent integer porttitor feugiat dignissim diam nisl suspendisse, tincidunt hac ornare sem convallis bibendum nulla lacinia rutrum mollis, cum porta at sociis vel congue ullamcorper scelerisque nec. Turpis montes praesent massa cursus duis semper non lacinia mus, posuere vel nulla mattis nisi nisl morbi pulvinar, euismod consequat ac justo felis pharetra blandit aptent.",
        "image": "https://i.imgur.com/VO0DshV.jpeg"
    },
    {
        "id": 6,
        "prompt": "Lorem ipsum dolor sit amet consectetur adipiscing elit felis pulvinar ultrices, dapibus dictumst curabitur leo risus consequat nulla enim quisque taciti, maecenas netus sagittis euismod rutrum est convallis quam luctus. Orci class tellus praesent integer porttitor feugiat dignissim diam nisl suspendisse, tincidunt hac ornare sem convallis bibendum nulla lacinia rutrum mollis, cum porta at sociis vel congue ullamcorper scelerisque nec. Turpis montes praesent massa cursus duis semper non lacinia mus, posuere vel nulla mattis nisi nisl morbi pulvinar, euismod consequat ac justo felis pharetra blandit aptent. Nisl leo lobortis felis ullamcorper vivamus sodales pulvinar curae, montes proin turpis iaculis risus purus quisque nascetur massa, ligula conubia blandit vestibulum ut morbi ante. Fermentum pellentesque libero nascetur magna natoque ornare per nullam ligula sapien placerat gravida malesuada, taciti cum aptent curae molestie ultricies sed viverra id nam facilisis. Mollis gravida aenean semper fermentum bibendum dictumst, porttitor vivamus at sed hac dictum nisi, venenatis pharetra facilisis nunc praesent.",
        "image": "https://i.imgur.com/VO0DshV.jpeg"
    },
    {
        "id": 7,
        "prompt": "cendol at Lake Danatoba",
        "image": "https://i.imgur.com/aRpOaYo.png"
    },
]

const MAX_DISPLAY_LIMIT_PROMPT: number = 180;

export default function Page() {
    const truncate = (input: String) => input.length > MAX_DISPLAY_LIMIT_PROMPT ? `${input.substring(0, MAX_DISPLAY_LIMIT_PROMPT)}...` : input;

    return (
        <div>
            <div className="grid grid-cols-4 gap-8 p-10">
                {/* TODO: Implement spinner here or this: https://ui.shadcn.com/docs/components/skeleton */}
                {promptHistory.map((h, index) => (
                    <Sheet key={index}>
                        <SheetTrigger asChild>
                            <div className="bg-background rounded-md overflow-hidden shadow-sm transition-all group-hover:scale-[1.02] border-2 border-slate-200 mb-4">
                                <Image
                                    src={h.image}
                                    alt="Tile image for prompt history"
                                    width={400}
                                    height={250}
                                    className="object-cover w-full aspect-[16/10]"
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
                                    <h3 className="text-lg font-semibold">Prompt</h3>
                                </div>
                                <div className="flex-1 overflow-auto pt-4 pb-4">
                                    <div>
                                        <p>{h.prompt}</p>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                ))}
            </div>
        </div>
    )
}