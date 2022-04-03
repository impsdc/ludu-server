import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IStore } from './interfaces/store.interface';
import { CreateStoreDto, UpdateStoreDto } from './dto';
import { Store } from './schemas/store.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private readonly customerModel: Model<Store>,
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Store[]> {
    const { limit, offset } = paginationQuery;

    return await this.customerModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('organization')
      .exec();
  }

  public async findOne(customerId: string): Promise<Store> {
    const customer = await this.customerModel
      .findById({ _id: customerId })
      .populate('organization')
      .exec();

    if (!customer) {
      throw new NotFoundException(`Store #${customerId} not found`);
    }

    return customer;
  }

  public async create(
    createStoreDto: CreateStoreDto,
  ): Promise<IStore> {
    const newStore = await this.customerModel.create(createStoreDto);
    return newStore;
  }

  public async update(
    customerId: string,
    updateStoreDto: UpdateStoreDto,
  ): Promise<IStore> {
    const existingStore = await this.customerModel.findByIdAndUpdate(
      { _id: customerId },
      updateStoreDto,
    );

    if (!existingStore) {
      throw new NotFoundException(`Store #${customerId} not found`);
    }

    return existingStore;
  }

  public async remove(customerId: string): Promise<any> {
    const deletedStore = await this.customerModel.findByIdAndRemove(
      customerId,
    );
    return deletedStore;
  }
}
