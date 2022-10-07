import {
  Controller,
  Post,
  Patch,
  Param,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
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
}
