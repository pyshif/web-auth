

export function defaults<T>(origin: object, cover: T): T {
    return {
        ...origin,
        ...cover,
    } as T;
}