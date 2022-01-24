import { readFile, writeFile } from 'fs/promises';

export class HeroRepository {
    constructor({ file }) {
        this.file = file;
    }

    async _currentFileContent() {
        return JSON.parse(await readFile(this.file))
    }

    async find(itemId) {
        const all = await this._currentFileContent();

        if(!itemId) {
            return all;
        }

        return all.find(({ id }) => itemId === id);
    }

    async create(data) {
        const currentFile = await this._currentFileContent();
        currentFile.push(data);

        await writeFile(this.file, JSON.stringify(currentFile));

        return data.id;
    }
    
}

const heroRepository = new HeroRepository({ file: './database/data.json' });
// heroRepository.create({ id: 2, name: 'Chapolin' }).then(console.log).catch(err => console.log('error', err))
// heroRepository.find(1).then(data=> console.log(data)).catch(err => console.log(err));