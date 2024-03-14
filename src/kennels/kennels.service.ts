import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Kennel } from './kennel.entity';

@Injectable()
export class KennelsService {
  constructor(
    @InjectRepository(Kennel)
    private kennelsRepository: Repository<Kennel>,
  ) {}
  // get all
  async findall(): Promise<Kennel[]> {
    return await this.kennelsRepository.find();
  }
  // get one
  async findOne(id: number): Promise<Kennel> {
    const options: FindOneOptions<Kennel> = { where: { id } };
    return await this.kennelsRepository.findOne(options);
  }

  //create kennel
  async create(kennel: Kennel): Promise<Kennel> {
    const newKennel = this.kennelsRepository.create(kennel);
    return await this.kennelsRepository.save(newKennel);
  }

  // update kennel
  async update(id: number, kennel: Kennel): Promise<Kennel> {
    await this.kennelsRepository.update(id, kennel);
    return await this.kennelsRepository.findOne({ where: { id } });
  }

  // delete kennel
  async delete(id: number): Promise<void> {
    await this.kennelsRepository.delete(id);
  }
}
