import { LOGIN_SLIDES, REGISTER_SLIDES, ONBOARDING_SLIDES } from './constants';

describe('constants', () => {
    describe('LOGIN_SLIDES', () => {
        it('should have the correct structure', () => {
            expect(LOGIN_SLIDES).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        img: expect.any(String),
                        title: expect.any(String),
                        subtitle: expect.any(String),
                        button: expect.objectContaining({
                            label: expect.any(String),
                            onClick: expect.any(Function),
                        }),
                    }),
                ])
            );
        });
    });

    describe('REGISTER_SLIDES', () => {
        it('should have the correct structure', () => {
            expect(REGISTER_SLIDES).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        img: expect.any(String),
                        title: expect.any(String),
                        subtitle: expect.any(String),
                        button: expect.objectContaining({
                            label: expect.any(String),
                            onClick: expect.any(Function),
                        }),
                    }),
                ])
            );
        });
    });

    describe('ONBOARDING_SLIDES', () => {
        it('should have the correct structure', () => {
            expect(ONBOARDING_SLIDES).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        img: expect.any(String),
                        title: expect.any(String),
                        subtitle: expect.any(String),
                    }),
                ])
            );
        });
    });
});