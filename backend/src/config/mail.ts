interface IMail {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            name: string;
            email: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        from: {
            name: 'Ester do GoBarber',
            email: 'equipe_gobarber@hostinger.codes',
        },
    },
} as IMail;
