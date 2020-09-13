import IStorageFileProvider from '../model/IStorageFileProvider';

export default class FakeStorageFile implements IStorageFileProvider {
    private storage: string[] = [];

    public async saveFile(file: string): Promise<string> {
        this.storage.push(file);

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const fileIndex = this.storage.findIndex(findFile => findFile === file);

        this.storage.splice(fileIndex, 1);
    }
}
