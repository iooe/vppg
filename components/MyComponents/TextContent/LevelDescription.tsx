import {ScrollArea} from "@/components/ui/scroll-area";

export function LevelDescription(props: { levelNumber: number, title: string, story: string }) {
    return (


        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4 typography-demo">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
                style={{marginBottom: '20px'}}>
                Level #{props.levelNumber}: {props.title}
            </h1>
            <div
                dangerouslySetInnerHTML={{
                    __html: props.story
                }}
            />
        </ScrollArea>
    )
}