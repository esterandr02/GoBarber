import { container } from 'tsyringe';

import IHashPassword from './Hash/model/IHashPassword';
import BCryptHashPassword from './Hash/implementation/BCryptHashPassword';

container.registerSingleton<IHashPassword>('HashPassword', BCryptHashPassword);
