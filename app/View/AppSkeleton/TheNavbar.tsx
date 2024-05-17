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
import {TheLevelChooser} from "@/app/View/AppSkeleton/Level/TheLevelChooser";
import {TutorialComponent} from "@/app/View/TextContent/Tutorial/TutorialComponent";
import {WikiComponent} from "@/app/View/TextContent/Wiki/WikiComponent";
import {ChangeLevelComponent} from "@/app/View/TextContent/ChangeLevel/ChangeLevelComponent";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Items",
        href: "/docs/primitives/alert-dialog",
        description:
            "Collect only 🍏 apples and 📦 crates, but do not touch the 🪙 coins.",
    },
    {
        title: "Variables",
        href: "/docs/primitives/hover-card",
        description:
            "The variable \"item-counter\" should be a number representing the total count of collected items.\n",
    },
    {
        title: "Exit",
        href: "/docs/primitives/progress",
        description:
            "To finish the level, head to the 🚪 exit when you are ready.\n",
    }
]

export function TheNavbar(props: { title: string, controlView: ReactElement }) {
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
                {/*<NavigationMenuItem>*/}
                {/*    <NavigationMenuTrigger className={'nav-item--faded'}>Getting started</NavigationMenuTrigger>*/}
                {/*    <NavigationMenuContent>*/}
                {/*        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">*/}
                {/*            <li className="row-span-3">*/}
                {/*                <NavigationMenuLink asChild>*/}
                {/*                    <a*/}
                {/*                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"*/}
                {/*                        href="/public"*/}
                {/*                    >*/}

                {/*                        <div className="mb-2 mt-4 text-lg font-medium">*/}
                {/*                            shadcn/ui*/}
                {/*                        </div>*/}
                {/*                        <p className="text-sm leading-tight text-muted-foreground">*/}
                {/*                            Beautifully designed components that you can copy and*/}
                {/*                            paste into your apps. Accessible. Customizable. Open*/}
                {/*                            Source.*/}
                {/*                        </p>*/}
                {/*                    </a>*/}
                {/*                </NavigationMenuLink>*/}
                {/*            </li>*/}
                {/*            <ListItem href="/docs" title="Introduction">*/}
                {/*                Re-usable components built using Radix UI and Tailwind CSS.*/}
                {/*            </ListItem>*/}
                {/*            <ListItem href="/docs/installation" title="Installation">*/}
                {/*                How to install dependencies and structure your app.*/}
                {/*            </ListItem>*/}
                {/*            <ListItem href="/docs/primitives/typography" title="Typography">*/}
                {/*                Styles for headings, paragraphs, lists...etc*/}
                {/*            </ListItem>*/}
                {/*        </ul>*/}
                {/*    </NavigationMenuContent>*/}
                {/*</NavigationMenuItem>*/}
                {/*<NavigationMenuItem>*/}
                {/*    <NavigationMenuTrigger className={'nav-item--faded'}>Change Level</NavigationMenuTrigger>*/}
                {/*    <NavigationMenuContent style={{minWidth: "auto"}}>*/}
                {/*        <TheLevelChooser/>*/}
                {/*    </NavigationMenuContent>*/}
                {/*</NavigationMenuItem>*/}
                {/*<NavigationMenuItem className={'nav-item--faded nav-item--title'}>*/}
                {/*    Level #1: {props.title}*/}
                {/*</NavigationMenuItem>*/}

                <NavigationMenuItem>
                    <NavigationMenuTrigger className={'nav-item--faded'}>Level 1: Short Level
                        Objectives</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
                            {components.map((component, index) => (
                                <ListItem
                                    key={component.title}
                                    title={(index + 1) + '. ' + component.title}
                                    href={'#'}
                                >
                                    {component.description}
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
