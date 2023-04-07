import { ShortenerModule } from '@modules/shortener/shortener.module';
import { Module } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilterService } from 'infra/filters/all-exceptions.filter';

@Module({
  imports: [ShortenerModule, HttpAdapterHost],
  controllers: [],
  providers: [AllExceptionsFilterService],
})
export class AppModule {}
