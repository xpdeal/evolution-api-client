declare module "bun:test" {
  export function test(name: string, fn: (done?: () => void) => void | Promise<void>): void;
  export function test(fn: (done?: () => void) => void | Promise<void>): void;
  export function describe(name: string, fn: () => void): void;
  export function it(name: string, fn: (done?: () => void) => void | Promise<void>): void;
  export function beforeAll(fn: () => void | Promise<void>): void;
  export function beforeEach(fn: () => void | Promise<void>): void;
  export function afterAll(fn: () => void | Promise<void>): void;
  export function afterEach(fn: () => void | Promise<void>): void;
  export function expect(value: any): {
    toBe(expected: any): void;
    toEqual(expected: any): void;
    toBeTruthy(): void;
    toBeFalsy(): void;
    toBeNull(): void;
    toBeUndefined(): void;
    toBeDefined(): void;
    toContain(item: any): void;
    toHaveLength(length: number): void;
    toThrow(message?: string | RegExp): void;
    toHaveBeenCalled(): void;
    toHaveBeenCalledWith(...args: any[]): void;
  };
  export function mock<T extends (...args: any[]) => any>(
    implementation?: T
  ): jest.Mock<ReturnType<T>, Parameters<T>>;
  export function mock<T extends object>(
    obj: T,
    property: keyof T,
    implementation?: T[keyof T]
  ): void;
}
