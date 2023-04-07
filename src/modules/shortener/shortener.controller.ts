import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { ShortenerService } from './shortener.service';

@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post()
  async create(@Body() createShortenerDto: CreateShortenerDto) {
    return await this.shortenerService.create(createShortenerDto);
  }

  @Get()
  async findAllByUrl(@Body() createShortenerDto: CreateShortenerDto) {
    return await this.shortenerService.findAllByUrl(createShortenerDto);
  }

  @Get(':shortedCode')
  async findOriginalUrlByCode(@Param('shortedCode') shortedCode: string) {
    return await this.shortenerService.findOriginalUrlByCode(shortedCode);
  }
}
