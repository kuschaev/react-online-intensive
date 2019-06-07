import {sum, delay, getUniqueID, getFullApiUrl} from './';

jest.setTimeout(10000);

describe('instruments:', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });
    test('sum function should throw when called with non-number type of first argument', () => {
        expect(() => sum('qwe', 1)).toThrow();
    });
    test('sum function should throw when called with non-number type of second argument', () => {
        expect(() => sum(2, 'rty')).toThrow();
    });
    test('sum function should return a sum of 2 number args', () => {
        expect(sum(2, 2)).toBe(4);
        expect(sum(1, 9)).toBe(10);
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });
    test('getUniqueID function should throw when called with non-number type of argument', () => {
        expect(() => getUniqueID('hello')).toThrow();
    });
    test('getUniqueID function should return a string', () => {
        expect(typeof getUniqueID()).toBe('string');
    });
    test('getUniqueID function should return a 15 char long string', () => {
        expect(getUniqueID().length).toBe(15);
    });

    test('getFullApiUrl function should be a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });
    test('getFullApiUrl function should throw when called with non-string type of first argument', () => {
        expect(() => getFullApiUrl(1, 'qwe')).toThrow();
    });
    test('getFullApiUrl function should throw when called with non-string type of second argument', () => {
        expect(() => getFullApiUrl('rty', 2)).toThrow();
    });
    test('getFullApiUrl function should concatenate string arguments with a "/"', () => {
        expect(getFullApiUrl('hello', 'world')).toBe('hello/world');
    });
});
