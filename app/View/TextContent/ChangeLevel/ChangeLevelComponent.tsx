import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import {ScrollArea} from "@/components/ui/scroll-area"
import {TheLevelChooser} from "@/app/View/AppSkeleton/Level/TheLevelChooser";
import * as React from "react";

export function ChangeLevelComponent(props: { defaultState: boolean }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Level Selector</Button>
            </SheetTrigger>
            <SheetContent side={'right'} style={{maxWidth: "50%"}}>
                <ScrollArea style={{
                    width: "100%",
                    height: "96%",
                    padding: "20px"
                }}>

                    <div>
                        <TheLevelChooser/>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
