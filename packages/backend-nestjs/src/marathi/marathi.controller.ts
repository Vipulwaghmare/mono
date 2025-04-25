import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MarathiService } from './marathi.service';
import { Song } from './interfaces/song.interface';
import { Aarti } from './interfaces/aarti.interface';
import { CreateSongDto } from './dtos/create-song.dto';
import { DeleteSongDto } from './dtos/delete-song.dto';
import { CreateAartiDto } from './dtos/create-aarti.dto';
import { DeleteAartiDto } from './dtos/delete-aarti.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SongResponseDto } from './dtos/response/song.response.dto';
import { AartiResponseDto } from './dtos/response/aarti.response.dto';

@ApiTags('Marathi')
@Controller('marathi')
export class MarathiController {
  constructor(private readonly marathiService: MarathiService) { }

  // Aarti endpoints
  @Get('/aarti')
  @ApiOperation({ summary: 'Get all aartis' })
  @ApiResponse({ status: 200, description: 'Returns all aartis', type: [AartiResponseDto] })
  async getAarti(): Promise<Aarti[]> {
    return this.marathiService.getAllAartis();
  }

  @Get('/aarti/:id')
  @ApiOperation({ summary: 'Get aarti by ID' })
  @ApiResponse({ status: 200, description: 'Returns the aarti', type: AartiResponseDto })
  @ApiResponse({ status: 404, description: 'Aarti not found' })
  async getAartiById(@Param('id') id: string): Promise<Aarti> {
    return this.marathiService.getAartiById(id);
  }

  @Post('/aarti')
  @ApiOperation({ summary: 'Create new aarti' })
  @ApiResponse({ status: 201, description: 'Aarti created successfully', type: AartiResponseDto })
  async addAarti(@Body() aartiData: CreateAartiDto): Promise<Aarti> {
    return this.marathiService.createAarti(aartiData);
  }

  @Put('/aarti/:id')
  @ApiOperation({ summary: 'Update aarti' })
  @ApiResponse({ status: 200, description: 'Aarti updated successfully', type: AartiResponseDto })
  @ApiResponse({ status: 404, description: 'Aarti not found' })
  async updateAarti(
    @Param('id') id: string,
    @Body() aartiData: CreateAartiDto,
  ): Promise<Aarti> {
    return this.marathiService.updateAarti(id, aartiData);
  }

  @Delete('/aarti/:id')
  @ApiOperation({ summary: 'Delete aarti' })
  @ApiResponse({ status: 200, description: 'Aarti deleted successfully' })
  @ApiResponse({ status: 404, description: 'Aarti not found' })
  async deleteAarti(@Param() params: DeleteAartiDto): Promise<void> {
    return this.marathiService.deleteAarti(params.id);
  }

  // Song endpoints
  @Get('/song')
  @ApiOperation({ summary: 'Get all songs' })
  @ApiResponse({ status: 200, description: 'Returns all songs', type: [SongResponseDto] })
  async getSong(): Promise<Song[]> {
    return this.marathiService.getAllSongs();
  }

  @Get('/song/:startLetter')
  @ApiOperation({ summary: 'Get songs by starting letter' })
  @ApiResponse({ status: 200, description: 'Returns songs starting with the specified letter', type: [SongResponseDto] })
  @ApiResponse({ status: 404, description: 'No songs found with this starting letter' })
  async getSongByStartLetter(@Param('startLetter') startLetter: string): Promise<Song[]> {
    return this.marathiService.getSongByStartLetter(startLetter);
  }

  @Post('/song')
  @ApiOperation({ summary: 'Create new song' })
  @ApiResponse({ status: 201, description: 'Song created successfully', type: SongResponseDto })
  async addSong(@Body() songData: CreateSongDto): Promise<Song> {
    return this.marathiService.createSong(songData);
  }

  @Get('/song/:id')
  @ApiOperation({ summary: 'Get song by ID' })
  @ApiResponse({ status: 200, description: 'Returns the song', type: SongResponseDto })
  @ApiResponse({ status: 404, description: 'Song not found' })
  async getSongById(@Param('id') id: string): Promise<Song> {
    return this.marathiService.getSongById(id);
  }

  @Put('/song/:id')
  @ApiOperation({ summary: 'Update song' })
  @ApiResponse({ status: 200, description: 'Song updated successfully', type: SongResponseDto })
  @ApiResponse({ status: 404, description: 'Song not found' })
  async updateSong(
    @Param('id') id: string,
    @Body() songData: CreateSongDto,
  ): Promise<Song> {
    return this.marathiService.updateSong(id, songData);
  }

  @Delete('/song/:id')
  @ApiOperation({ summary: 'Delete song' })
  @ApiResponse({ status: 200, description: 'Song deleted successfully' })
  @ApiResponse({ status: 404, description: 'Song not found' })
  async deleteSong(@Param() params: DeleteSongDto): Promise<void> {
    return this.marathiService.deleteSong(params.id);
  }
}
