import {
  Controller,
  Get,
  Query,
  Body,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { GraphService } from './graph.service';
import { TransitionDto } from '../dto/transition.dto';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get('next-status')
  getNextStatus(
    @Query('currentStatus', ParseIntPipe) currentStatus: number,
    @Query() transition: TransitionDto,
  ) {
    let nextStatus: number | null = this.graphService.getNextStatus(
      currentStatus,
      transition,
    );

    return this.graphService.getNextStatus(currentStatus, transition);
  }

  @Post('find-path')
  findPath(
    @Body('statuses') statuses: number[],
    @Body('transition') transition: TransitionDto,
  ) {
    return this.graphService.findPath(statuses, transition);
  }
}
