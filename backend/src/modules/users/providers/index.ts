import { container } from 'tsyringe';

import IHashProvider from './Hash/model/IHashProvider';
import BCryptHashProvider from './Hash/implementation/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
