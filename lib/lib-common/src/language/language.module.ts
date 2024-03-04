import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { LanguageService } from './language.service';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'ko',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    LanguageModule,
  ],
  providers: [LanguageService],
  exports: [I18nModule, LanguageService],
})
export class LanguageModule {}
