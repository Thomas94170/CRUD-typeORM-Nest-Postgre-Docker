import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Body,
  Query,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DoggosService } from './doggos.service';
import { Doggo } from './doggo.entity';
import { Kennel } from 'src/kennels/kennel.entity';
import { CreateDoggoDto } from './create-doggo.dto';

@Controller('doggos')
export class DoggosController {
  constructor(private readonly doggosService: DoggosService) {}

  // get all
  @Get()
  async findAll(): Promise<Doggo[]> {
    return await this.doggosService.findall();
  }

  // get one doggo
  @Get(':id')
  async findOne(@Param(':id') id: number): Promise<Doggo> {
    const doggo = await this.doggosService.findOne(id);
    if (!doggo) {
      throw new Error('Doggo non trouvé' + Error);
    } else {
      console.log(doggo);
      return doggo;
    }
  }

  // create doggo
  @Post()
  async create(@Body() createDoggoDto: CreateDoggoDto): Promise<Doggo> {
    try {
      console.log('id du chenil est: ' + createDoggoDto.kennelId);
      if (!createDoggoDto.kennelId) {
        throw new BadRequestException(
          'ID du chenil introuvable, chenil n existe pas',
        );
      }
      // Créer votre doggo avec kennelId
      const doggo = await this.doggosService.create(createDoggoDto);
      return doggo;
    } catch (error) {
      console.error('Erreur lors de la création du chien :', error);
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la création du chien.',
      );
    }
  }

  // update doggo
  @Put(':id')
  async update(@Param('id') id: number, @Body() doggo: Doggo): Promise<Doggo> {
    return this.doggosService.update(id, doggo);
  }

  //   delete doggo
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const doggo = await this.doggosService.findOne(id);
    if (!doggo) {
      throw new Error('Doggo introuvable: ' + Error);
    }
    return this.doggosService.delete(id);
  }
}
