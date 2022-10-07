import { Controller, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/interceptors/transform.interceptor';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { LikeDto } from './dto/likes.dto';
import { LikesService } from './likes.service';

@Controller('like')
@Serialize(LikeDto)
export class LikesController {
  constructor(private likeservice: LikesService) {}
  @UseGuards(JWTAuthGuard)
  @Patch('/post/:id')
  likePost(@Param('id') id: string, @Request() req: any) {
    return this.likeservice.likePost(parseInt(id), req.user);
  }
}
