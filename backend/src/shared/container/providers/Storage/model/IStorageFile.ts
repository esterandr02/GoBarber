export default interface IStorageFile {
    saveFile(file: string): Promise<string>;
    deleteFile(file: string): Promise<void>;
}
