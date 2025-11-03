module.exports = function (eleventyConfig) {
    // کپی پوشه assets از src به _site
    eleventyConfig.addPassthroughCopy("src/assets");

    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
