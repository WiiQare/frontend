import { index } from './index'; // Replace with the correct path to your index file

describe('index Creation', () => {
    test('index object is created successfully', () => {
        expect(index).toBeDefined();
    });

    test('index object has expected properties and values', () => {
        // Example checks, add more as needed
        expect(index.palette.primary.main).toBe('#f8892b');
        expect(index.breakpoints.values).toEqual({
            xs: 0,
            sm: 600,
            md: 1000,
            lg: 1200,
            xl: 1920,
        });
        expect(index.typography.body1).toEqual({
            fontSize: '1.1rem',
            fontWeight: 300,
            lineHeight: 1.5,
        });
    });
});
