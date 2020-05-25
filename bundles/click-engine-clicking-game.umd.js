(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@click-engine/clicking-game', ['exports', '@angular/core'], factory) :
    (factory((global['click-engine'] = global['click-engine'] || {}, global['click-engine']['clicking-game'] = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var defaultGameBoardConfiguration = {
        canvasWidth: 300,
        canvasHeight: 300,
        groundFriction: 0.005,
        gravityStrength: 0.1
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var Ball = /** @class */ (function () {
        function Ball(x, y, radius, dx, dy, bounciness) {
            if (dx === void 0) {
                dx = 0;
            }
            if (dy === void 0) {
                dy = 0;
            }
            if (bounciness === void 0) {
                bounciness = 0.8;
            }
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.dx = dx;
            this.dy = dy;
            this.bounciness = bounciness;
        }
        /**
         * @param {?} canvas
         * @return {?}
         */
        Ball.prototype.draw = /**
         * @param {?} canvas
         * @return {?}
         */
            function (canvas) {
                canvas.beginPath();
                canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                canvas.fill();
                canvas.stroke();
            };
        return Ball;
    }());

    var __assign = (this && this.__assign) || Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    var __read = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    };
    var __spread = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    var ClickingGameComponent = /** @class */ (function () {
        function ClickingGameComponent() {
            this.balls = [];
        }
        /**
         * @return {?}
         */
        ClickingGameComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                if (!this.canvas) {
                    return;
                }
                this.config = __assign({}, defaultGameBoardConfiguration, this.gameBoardConfiguration);
                this.canvas.nativeElement.width = this.config.canvasWidth;
                this.canvas.nativeElement.height = this.config.canvasHeight;
                this.updateRender();
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        ClickingGameComponent.prototype.onClick = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                /** @type {?} */
                var newBall = new Ball($event.x, $event.y, 5, 16 * (Math.random() - 0.5), -8 * (Math.random()), (Math.random() * 5.9 + 4) / 10);
                this.balls = __spread(this.balls, [newBall]);
            };
        /**
         * @param {?} balls
         * @return {?}
         */
        ClickingGameComponent.prototype.calculateGravityEffect = /**
         * @param {?} balls
         * @return {?}
         */
            function (balls) {
                var _this = this;
                balls.forEach(function (ball) {
                    ball.dy += _this.config.gravityStrength;
                });
            };
        /**
         * @param {?} balls
         * @return {?}
         */
        ClickingGameComponent.prototype.calculateMotion = /**
         * @param {?} balls
         * @return {?}
         */
            function (balls) {
                balls.forEach(function (ball) {
                    ball.x += ball.dx;
                    ball.y += ball.dy;
                });
            };
        /**
         * @param {?} balls
         * @return {?}
         */
        ClickingGameComponent.prototype.resolveWallCollisions = /**
         * @param {?} balls
         * @return {?}
         */
            function (balls) {
                /** @type {?} */
                var maxWidth = this.config.canvasWidth;
                /** @type {?} */
                var maxHeight = this.config.canvasHeight;
                /** @type {?} */
                var friction = this.config.groundFriction;
                balls.forEach(function (ball) {
                    ball.x = (ball.x - ball.radius < 0) ? ball.radius : ball.x;
                    ball.x = (ball.x + ball.radius > maxWidth) ? maxWidth - ball.radius : ball.x;
                    ball.y = (ball.y - ball.radius < 0) ? ball.radius : ball.y;
                    ball.y = (ball.y + ball.radius > maxHeight) ? maxHeight - ball.radius : ball.y;
                    ball.dy = (ball.y === ball.radius || ball.y === maxHeight - ball.radius) ? -ball.bounciness * ball.dy : ball.dy;
                    ball.dx = (ball.x === ball.radius || ball.x === maxWidth - ball.radius) ? -ball.bounciness * ball.dx : ball.dx;
                    ball.dx = (ball.y === maxHeight - ball.radius) ? ball.dx * (1 - friction) : ball.dx;
                });
            };
        /**
         * @return {?}
         */
        ClickingGameComponent.prototype.updateRender = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var canvasContext = this.canvas.nativeElement.getContext('2d');
                canvasContext.clearRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
                this.calculateGravityEffect(this.balls);
                this.calculateMotion(this.balls);
                this.resolveWallCollisions(this.balls);
                this.balls.forEach(function (ball) { return ball.draw(canvasContext); });
                requestAnimationFrame(this.updateRender.bind(this));
            };
        ClickingGameComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ce-clicking-game',
                        template: "<canvas #gameBoard (click)=\"onClick($event)\"></canvas>\r\n",
                        styles: ["canvas{border:1px solid #000}"]
                    }] }
        ];
        ClickingGameComponent.propDecorators = {
            gameBoardConfiguration: [{ type: core.Input }],
            canvas: [{ type: core.ViewChild, args: ['gameBoard',] }]
        };
        return ClickingGameComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ClickingGameModule = /** @class */ (function () {
        function ClickingGameModule() {
        }
        ClickingGameModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [ClickingGameComponent],
                        exports: [ClickingGameComponent]
                    },] }
        ];
        return ClickingGameModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.ClickingGameModule = ClickingGameModule;
    exports.ClickingGameComponent = ClickingGameComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=click-engine-clicking-game.umd.js.map