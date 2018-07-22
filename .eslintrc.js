module.exports = {
    "extends": "airbnb-base",
    "rules": {
    "class-methods-use-this": ["error", { "exceptMethods": ["start", 
                                                            "initViewEngine", 
                                                            "initExpressMiddleWare", 
                                                            "initCustomMiddleware",
                                                            "initDbSeeder",
                                                            "initRoutes",
                                                        "load"] }],
    "func-names": ["error", "never"]
    // "eslint no-shadow": ["error", { "allow": ["err"] }]
    }
};