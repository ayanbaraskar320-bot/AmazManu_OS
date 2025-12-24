module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NODE_ENV === 'production'
                    ? 'https://your-backend-url.vercel.app/api/:path*'
                    : 'http://localhost:4000/api/:path*',
            },
        ];
    },
};
