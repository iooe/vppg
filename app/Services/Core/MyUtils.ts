export default class MyUtils {
    public static replacePlaceholders(pattern: string, ...args: string[]): string {
        return pattern.replace(/\$(\{\d+\}|\d+)/g, (match) => {
            // Extract the numeric part, considering both formats: '{$n}' and '$n'
            const index = parseInt(match.replace(/\D/g, ''), 10) - 1;
            // Replace with corresponding argument, or keep the match if argument is missing
            return args[index] ?? match;
        });
    }
}