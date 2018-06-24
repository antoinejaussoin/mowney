export default function execute<T>(query: string, parameters: any, queryModifier?: (query: string) => string, resultModifier?: any): Promise<T>;
