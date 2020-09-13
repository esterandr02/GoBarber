export default interface IStorageFileProvider {
    saveFile(file: string): Promise<string>;
    deleteFile(file: string): Promise<void>;
}
