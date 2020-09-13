import IMailTemplateProvider from '../model/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse(): Promise<string> {
        return 'Mail Template';
    }
}
