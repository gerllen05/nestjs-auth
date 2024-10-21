import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private itemRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    await this.entityManager.save(user);
  }

  async getAll(): Promise<User[]> {
    return this.itemRepository.find();
  }
}
