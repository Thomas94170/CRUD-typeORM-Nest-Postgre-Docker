import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Doggo } from './doggo.entity';
import { Kennel } from 'src/kennels/kennel.entity';
import { CreateDoggoDto } from './create-doggo.dto';

@Injectable()
export class DoggosService {
  doggoRepository: any;
  constructor(
    @InjectRepository(Doggo)
    private doggosRepository: Repository<Doggo>,
    @InjectRepository(Kennel)
    private kennelsRepository: Repository<Kennel>,
  ) {}
  // get all
  async findall(): Promise<Doggo[]> {
    try {
      return await this.doggosRepository.find();
    } catch (error) {
      throw new Error('erreur : ' + error);
    }
  }
  // get one
  async findOne(id: number): Promise<Doggo> {
    try {
      const options: FindOneOptions<Doggo> = { where: { id } };
      return await this.doggosRepository.findOne(options);
    } catch (error) {
      throw new Error('erreur : ' + error);
    }
  }

  //create doggo
  async create(createDoggoDto: CreateDoggoDto): Promise<Doggo> {
    try {
      // Vérifier si le chenil est plein
      const kennel = await this.kennelsRepository.findOne({
        where: { id: createDoggoDto.kennelId },
        relations: ['doggos'],
      });
      if (!kennel) {
        throw new BadRequestException("Le chenil spécifié n'existe pas");
      }
      if (kennel.doggos.length >= kennel.capacity) {
        throw new BadRequestException(
          "Le chenil est plein, impossible d'ajouter un nouveau chien",
        );
      }

      const doggo = new Doggo();
      doggo.race = createDoggoDto.race;
      doggo.name = createDoggoDto.name;
      doggo.kennelId = createDoggoDto.kennelId;
      console.log('mon doggo est :' + doggo);
      return await this.doggosRepository.save(doggo);
    } catch (error) {
      throw new Error('erreur' + error);
    }
  }
  // update doggo
  async update(id: number, doggo: Doggo): Promise<Doggo> {
    try {
      await this.doggosRepository.update(id, doggo);
      return await this.doggosRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error('erreur : ' + error);
    }
  }

  // delete doggo
  async delete(id: number): Promise<void> {
    try {
      await this.doggosRepository.delete(id);
    } catch (error) {
      throw new Error('error : ' + error);
    }
  }
}
