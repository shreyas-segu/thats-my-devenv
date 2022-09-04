import { Module } from '@nestjs/common';
import { HomeOpenedService } from './home-opened.service';

@Module({
  providers: [HomeOpenedService],
  exports: [HomeOpenedService],
})
export class HomeOpenedModule {}
