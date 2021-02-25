import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Token)
    private readonly repo: Repository<Token>,
  ) {}

  getAll(): Promise<Token[]> {
    return this.repo.find();
  }
}
