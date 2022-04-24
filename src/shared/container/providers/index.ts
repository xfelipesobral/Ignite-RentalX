import { container } from 'tsyringe'

import { IDateProvider } from './DateProvider/IDateProvider'
import { DayjsDateProvider } from './DateProvider/implementations/DayJSDateProvider'

container.registerSingleton<IDateProvider>(
    'DayjsDateProvider',
    DayjsDateProvider
)