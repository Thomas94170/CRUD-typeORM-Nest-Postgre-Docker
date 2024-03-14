import { Module } from '@nestjs/common';
import { DoggosController } from './doggos.controller';
import { DoggosService } from './doggos.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Doggo } from './doggo.entity';
import { Kennel } from 'src/kennels/kennel.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Doggo, Kennel])],
  controllers: [DoggosController],
  providers: [DoggosService],
})
export class DoggosModule {}
