import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto, UpdateLocationDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('locations')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  public async getAllOrganization(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const location = await this.locationService.findAll(
      paginationQuery,
    );
    return res.status(HttpStatus.OK).json(location);
  }

  @Get('/:id')
  public async getOrganization(
    @Res() res,
    @Param('id') organizationId: string,
  ) {
    if (!organizationId) {
      throw new NotFoundException('location does not exist!');
    }

    const organization = await this.locationService.findOne(
      organizationId,
    );
    return res.status(HttpStatus.OK).json(organization);
  }

  @Post()
  public async addOrganization(
    @Res() res,
    @Body() createOrganizationDto: CreateLocationDto,
  ) {
    try {
      const organization = await this.locationService.create(
        createOrganizationDto,
      );
      return res.status(HttpStatus.OK).json({
        message: 'organization has been created successfully',
        organization,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Organization not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateOrganization(
    @Res() res,
    @Param('id') organizationId: string,
    @Body() updateOrganizationDto: UpdateLocationDto,
  ) {
    try {
      const organization = await this.locationService.update(
        organizationId,
        updateOrganizationDto,
      );
      if (!organization) {
        throw new NotFoundException('organization does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'organization has been successfully updated',
        organization,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Organization not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deleteOrganization(
    @Res() res,
    @Param('id') organizationId: string,
  ) {
    if (!organizationId) {
      throw new NotFoundException('organization ID does not exist');
    }

    const organization = await this.locationService.remove(organizationId);

    return res.status(HttpStatus.OK).json({
      message: 'organization has been deleted',
      organization,
    });
  }
}
