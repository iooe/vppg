import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import {ScrollArea} from "@/components/ui/scroll-area"
import WikiContent from "@/components/MyComponents/TextContent/Wiki/WikiContent";

export function WikiComponent(props: { defaultState: boolean }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Wiki</Button>
            </SheetTrigger>
            <SheetContent side={'right'} style={{maxWidth: "50%"}}>
                <ScrollArea style={{
                    width: "100%",
                    height: "96%",
                    padding: "20px"
                }}>

                    <WikiContent/>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
