import { container } from 'tsyringe';

import HandlebarsTemplate from './implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './model/IMailTemplateProvider';

const providers = {
    handlebars: HandlebarsTemplate,
};

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    providers.handlebars,
);
