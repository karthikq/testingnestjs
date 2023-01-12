import {
  Controller,
  Post,
  Patch,
  Param,
  UseGuards,
  Request,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { Serialize } from 'src/interceptors/transform.interceptor';

import { CommentsService } from './comments.service';
import { CommetDto } from './dto/comment.dto';
import { CreateComment } from './dto/create-comment.dto';

@Controller('comment')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(JWTAuthGuard)
  @Patch('/post/:id')
  AddComment(
    @Param('id') id: string,
    @Body() body: CreateComment,
    @Request() req: any,
  ) {
    return this.commentsService.AddComment(
      body.message,
      parseInt(id),
      req.user,
    );
  }

  @UseGuards(JWTAuthGuard)
  @Patch('/edit/:id')
  EditComment(
    @Param('id') id: string,
    @Query() query: any,
    @Request() req: any,
    @Body() body: CreateComment,
  ) {
    return this.commentsService.EditComment(
      body.message,
      parseInt(id),
      query.commentId,
      req.user,
    );
  }

  @UseGuards(JWTAuthGuard)
  @Delete('/post/delete/:id')
  deleteComment(
    @Param('id') id: string,
    @Query() query: any,
    @Request() req: any,
  ) {
    return this.commentsService.deleteComment(
      query.commentId,
      parseInt(id),
      req.user,
    );
  }
}
