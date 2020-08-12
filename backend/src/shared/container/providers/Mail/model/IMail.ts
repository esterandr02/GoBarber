export default interface IMail {
    sendMail(to: string, body: string): Promise<void>;
}
