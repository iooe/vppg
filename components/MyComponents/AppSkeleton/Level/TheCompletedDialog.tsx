"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import MyUtils from "@/app/Services/Core/MyUtils";
import Levels from "@/app/Config/Levels";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import LocalStorage from "@/app/Services/Core/LocalStorage";

export function TheCompletedDialog(props: {
    onClose: Function,
    isOpened: boolean,
    currentCodeInteractionsCounter: number,
    recommendedCodeInteractionsCounter: number,
}) {

    const nextLevel = () => {
        const currentLevelIndex = MyUtils.getCurrentLevelIndex();

        const nextLevelIndex = (new Levels()).levels.length > currentLevelIndex + 1 ? currentLevelIndex + 1 : 0;

        MyUtils.setCurrentLevelIndex(nextLevelIndex);

        setTimeout(() => {
            location.reload()
        }, 200)
    }

    let [theBestScore, setBestScore] = useState(
        LocalStorage.getItem('level' + MyUtils.getCurrentLevelIndex()) === null
            ? props.currentCodeInteractionsCounter
            : parseInt(LocalStorage.getItem('level' + MyUtils.getCurrentLevelIndex()))
    )

    useEffect(() => {
        if (isNaN(theBestScore) || theBestScore >= props.currentCodeInteractionsCounter) {
            Cookies.set('level' + MyUtils.getCurrentLevelIndex(), props.currentCodeInteractionsCounter, {
                expires: 86400 * 365,
                secure: true,
                sameSite: 'None',
                path: '/',
            })
            setBestScore(props.currentCodeInteractionsCounter)
        }

    }, [props.isOpened])

    return (
        <AlertDialog open={props.isOpened}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>You&apos;re a winner!</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>
                            The total actions you took is <strong>{props.currentCodeInteractionsCounter}</strong>.
                        </p>
                        <p>
                            Your best score is <strong>{theBestScore}</strong>.
                        </p>
                        <p>
                            The recommended amount of actions
                            is <strong>{props.recommendedCodeInteractionsCounter}</strong>.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => location.reload()}>Restart</AlertDialogCancel>
                    <AlertDialogAction onClick={() => nextLevel()}>Next Level</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}