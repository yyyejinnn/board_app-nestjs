import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './boards.repository';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async createBoard(createBoard: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoard;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);
    return board;
  }

  //   getAllBoards(): Board[] {
  //     return this.boards;
  //   }
  //   createBoard(createBoardDto: CreateBoardDto): Board {
  //     const { title, description } = createBoardDto;
  //     //같은 방법
  //     //const title = createBoardDto.title;
  //     //const description = createBoardDto.description;
  //     const board: Board = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: BoardStatus.PUBLIC,
  //     };
  //     this.boards.push(board);
  //     return board;
  //   }
  //   getBoardById(id: string): Board {
  //     const found = this.boards.find((board) => board.id === id);
  //     if (!found) {
  //       throw new NotFoundException(`Can't not found ${id}`);
  //     }
  //     return found;
  //   }
  //   deleteBoard(id: string) {
  //     const found = this.getBoardById(id);
  //     this.boards = this.boards.filter((board) => board.id != found.id);
  //   }
  //   updateBoard(id: string, status: BoardStatus): Board {
  //     const board = this.getBoardById(id);
  //     board.status = status;
  //     return board;
  //   }
}
