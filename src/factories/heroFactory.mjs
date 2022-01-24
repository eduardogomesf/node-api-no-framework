import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { HeroRepository } from '../repositories/heroRepository.mjs';
import { HeroService } from '../services/heroService.mjs';

export const generateInstance = () => {
    const __filename = fileURLToPath(import.meta.url);

    const heroRepository = new HeroRepository({
        file: join(__filename, '..', '..', '..', 'database', 'data.json'),
    })

    const heroService = new HeroService({ heroRepository });

    return heroService;
}

// generateInstance().find().then(console.log).catch(err => console.log(err));