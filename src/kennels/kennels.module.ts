import { Module } from '@nestjs/common';
import { KennelsController } from './kennels.controller';
import { KennelsService } from './kennels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kennel } from './kennel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kennel])],
  controllers: [KennelsController],
  providers: [KennelsService],
})

export class KennelsModule {}
