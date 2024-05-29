import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import {ScrollArea} from "@/components/ui/scroll-area"
import * as React from "react";
import {NavigationMenuLink} from "@/components/ui/navigation-menu";
import MyUtils from "@/app/Services/Core/MyUtils";
import {cn} from "@/lib/utils";
import Levels from "@/app/Config/Levels";
import {StaticImageData} from "next/image";
import {CardHeader, CardTitle} from "@/components/ui/card";

const components: {
    title: string;
    image: StaticImageData,
    description: string
}[] = new Levels().levels.map((level) => {
    return {
        title: level.title,
        description: level.annotation,
        image: level.image
    }
});

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
                        <CardHeader>
                            <CardTitle>🌟 Level Selector</CardTitle>
                        </CardHeader>

                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
                            {components.map((component, index) => (
                                <ListItem
                                    onClick={() => {
                                        MyUtils.setCurrentLevelIndex(index)
                                    }}
                                    key={component.title + index}
                                    title={'Level #' + (index + 1) + '. ' + component.title}
                                >
                                    <img className={'level-chooser-image'} src={component.image?.src} alt={'Image'}/>
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "level-chooser block select-none space-y-1 rounded-md p-5 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"