define(['jquery', 'underscore', 'sinon', 'backbone', 'text', 'handlebars'], function ($, _, sinon, backbone, text, handlebars) {
    describe('test module', function () {
        it('loads jquery', function () {
            expect($).toBeDefined();
        });
        it('loads underscore', function () {
            expect(_).toBeDefined();
        });
        it('loads sinon', function () {
            expect(sinon).toBeDefined();
        });
        it('loads backbone', function () {
            expect(backbone).toBeDefined();
        });
        it('loads text', function () {
            expect(text).toBeDefined();
        });
        it('loads handlebars', function () {
            expect(handlebars).toBeDefined();
        });
    });
});