import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './boards.models';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoardsController(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoardController(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(title, description);
  }
}
