import fs from 'fs';
import handlebars from 'handlebars';

import IMailTemplateProvider from '../model/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
    implements IMailTemplateProvider {
    public async parse({
        template_file,
        variables,
    }: IParseMailTemplateDTO): Promise<string> {
        const template = await fs.promises.readFile(template_file, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}
