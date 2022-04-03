import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ILocation } from './interfaces/location.interface';
import { CreateLocationDto, UpdateLocationDto } from './dto';
import { Location } from './schemas/location.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<Location>,
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Location[]> {
    const { limit, offset } = paginationQuery;
    return await this.locationModel
      .find()
      .populate('store')
      .exec();
  }

  public async findOne(LocationId: string): Promise<Location> {
    const Location = await this.locationModel
      .findById({ _id: LocationId })
      .populate('store')
      .exec();

    if (!Location) {
      throw new NotFoundException(`Location #${LocationId} not found`);
    }

    return Location;
  }

  public async create(
    createLocationDto: CreateLocationDto,
  ): Promise<ILocation> {
    const Location = await this.locationModel.create(
      createLocationDto,
    );
    return Location;
  }

  public async update(
    LocationId: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<ILocation> {
    const existingLocation = await this.locationModel.findByIdAndUpdate(
      { _id: LocationId },
      updateLocationDto,
      { new: true },
    );

    if (!existingLocation) {
      throw new NotFoundException(`Location #${LocationId} not found`);
    }
    return existingLocation;
  }

  public async remove(LocationId: string): Promise<any> {
    const Location = await this.locationModel.findByIdAndRemove(
      LocationId,
    );
    return Location;
  }
}
