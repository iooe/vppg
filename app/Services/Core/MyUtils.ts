import { withRouter } from 'next/router'

export default class MyUtils {
    public static replacePlaceholders(pattern: string, ...args: string[]): string {
        return pattern.replace(/\$(\{\d+\}|\d+)/g, (match) => {
            // Extract the numeric part, considering both formats: '{$n}' and '$n'
            const index = parseInt(match.replace(/\D/g, ''), 10) - 1;
            // Replace with corresponding argument, or keep the match if argument is missing
            return args[index] ?? match;
        });
    }

    public static getCurrentLevelIndex(): number {
        if (typeof window !== "undefined") {

            const params = new URLSearchParams(window.location.search);

            return params.get('level-index') ? Number.parseInt(params.get('level-index')) : 0;
        }

        return 0
    }

    public static setCurrentLevelIndex(level: number): void {
        if (typeof window !== "undefined") {
            window.location.href = `?level-index=${level}`;
        }
    }
}