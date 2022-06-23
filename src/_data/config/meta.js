module.exports = {
    environment: process.env.NODE_ENV,
    icons: {
        webmanifest: [
            {
                src: "icon.png",
                type: "image/png",
                sizes: "192x192"
            }
        ]
    },
    page: {
        title: {
            seperator: "-",
            length: 70,
        },
        description: {
            length: 200
        },
        keywords: {
            count: 5
        }
    }
}
