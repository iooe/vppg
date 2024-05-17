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

export function TheCompletedDialog(props: {
    onClose: Function,
    isOpened: boolean,
}) {
    return (
        <AlertDialog open={props.isOpened}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>You&apos;re a winner!</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>
                            The total actions you took is <strong>18</strong>.
                        </p>
                        <p>
                            The recommended amount of actions is <strong>20</strong>.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => location.reload()}>Restart</AlertDialogCancel>
                    <AlertDialogAction>Next Level</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}