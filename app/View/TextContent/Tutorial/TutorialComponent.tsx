import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import TutorialContent from "@/app/View/TextContent/Tutorial/TutorialContent";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Menubar,} from "@/components/ui/menubar"

export function TutorialComponent(props: { defaultState: boolean }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">How to play</Button>
            </SheetTrigger>
            <SheetContent side={'right'} style={{maxWidth: "50%"}}>
                <ScrollArea style={{
                    width: "100%",
                    height: "96%",
                    padding: "20px"
                }}>

                    <Menubar style={{
                        border: "0",
                        marginBottom: "25px",
                        paddingLeft: 0
                    }}>
                        <Button variant={'outline'}>How to play</Button>
                        <Button variant={'outline'}>Wiki</Button>
                        <Button variant={'outline'}>Level Selector</Button>
                    </Menubar>

                    <TutorialContent/>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
