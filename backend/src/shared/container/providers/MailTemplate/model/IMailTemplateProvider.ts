import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IParseMailTemplateProvider {
    parse(data: IParseMailTemplateDTO): Promise<string>;
}
