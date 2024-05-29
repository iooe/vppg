"use client"

import * as React from "react"
import {ReactElement} from "react"

import {cn} from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {TutorialComponent} from "@/components/MyComponents/TextContent/Tutorial/TutorialComponent";
import {WikiComponent} from "@/components/MyComponents/TextContent/Wiki/WikiComponent";
import {ChangeLevelComponent} from "@/components/MyComponents/TextContent/ChangeLevel/ChangeLevelComponent";

export function TheNavbar(props: { objectives: string[], controlView: ReactElement }) {
    return (
        <NavigationMenu style={{width: "100vw"}}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <TutorialComponent defaultState={true}/>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <WikiComponent defaultState={true}/>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <ChangeLevelComponent defaultState={true}/>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger className={'nav-item--faded'}>
                        Level Objectives</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
                            {props.objectives.map((component, index) => (
                                <ListItem
                                    key={component}
                                    title={(index + 1) + '. '}
                                >
                                    {component}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    {props.controlView}
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
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
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
