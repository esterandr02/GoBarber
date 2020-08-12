import IMail from '../model/IMail';

interface IMessage {
    to: string;
    body: string;
}

export default class FakeMail implements IMail {
    private messages: IMessage[] = [];

    public async sendMail(to: string, body: string): Promise<void> {
        this.messages.push({
            to,
            body,
        });
    }
}
