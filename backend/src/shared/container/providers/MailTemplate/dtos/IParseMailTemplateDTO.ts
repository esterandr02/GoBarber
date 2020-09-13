interface ITemplateVariables {
    [key: string]: string | number;
}

export default interface IMailTemplateDTO {
    template_file: string;
    variables: ITemplateVariables;
}
