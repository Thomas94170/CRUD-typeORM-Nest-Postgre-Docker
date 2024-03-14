import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { KennelsService } from './kennels.service';
import { Kennel } from './kennel.entity';

@Controller('kennels')
export class KennelsController {
  constructor(private readonly kennelsService: KennelsService) {}

  // get all
  @Get()
  async findAll(): Promise<Kennel[]> {
    return await this.kennelsService.findall();
  }

  // get one kennel
  @Get(':id')
  async findOne(@Param(':id') id: number): Promise<Kennel> {
    const kennel = await this.kennelsService.findOne(id);
    if (!kennel) {
      throw new Error('Kennel non trouvé' + Error);
    } else {
      console.log(kennel);
      return kennel;
    }
  }

  // create kennel
  @Post()
  async create(@Body() kennel: Kennel): Promise<Kennel> {
    return await this.kennelsService.create(kennel);
  }

  // update kennel
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() kennel: Kennel,
  ): Promise<Kennel> {
    console.log('kennel updated');
    return this.kennelsService.update(id, kennel);
  }

  //   delete kennel
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const kennel = await this.kennelsService.findOne(id);
    if (!kennel) {
      throw new Error('Kennel introuvable: ' + Error);
    }
    console.log('kennel supprimé');
    return this.kennelsService.delete(id);
  }
}
