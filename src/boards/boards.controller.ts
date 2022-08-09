import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './boards.models';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoardsController(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoardController(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Board {
    return this.boardsService.createBoard(title, description);
  }
}
