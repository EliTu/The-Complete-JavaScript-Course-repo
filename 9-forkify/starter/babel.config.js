const presets = [
    [
        "@babel/env",
        {
            targets: {
                "browsers": [
                    "last 5 versions",
                    "ie >= 8"
                ]
            },
            useBuiltIns: "usage",
        },
    ],
];

module.exports = {
    presets
};