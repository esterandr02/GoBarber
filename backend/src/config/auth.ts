interface IJwt {
    jwt: {
        secret: string;
        expiresIn: string;
    };
}

export default {
    jwt: {
        secret: process.env.APP_SECRET || 'default',
        expiresIn: process.env.APP_SECRET_EXPIRES_IN || '1d',
    },
} as IJwt;
