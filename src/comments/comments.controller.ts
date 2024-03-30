import { CommentsService } from './comments.service'
import { CreatePostDto } from './dto/create-comment.dto'
import { UpdatePostDto } from './dto/update-comment.dto'
import { Controller } from '@nestjs/common/decorators/core'
import { Post, Body, Get, Param, Delete, HttpCode, Patch } from '@nestjs/common/decorators/http'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { SkipAuth } from '@/auth/decorators/skip-auth.decorator'
import { AuthUser } from '@/auth/decorators/auth-user.decorator'
import { JwtUserEntity } from '@/auth/entities/jwt-user.entity'

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly produtosService: CommentsService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createPostDto: CreatePostDto, @AuthUser() user: JwtUserEntity) {
    return this.produtosService.create(createPostDto, user.id)
  }

  @SkipAuth()
  @Get()
  findAll() {
    return this.produtosService.findAll()
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(id)
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Body() updateProdutoDto: UpdatePostDto, @AuthUser() user: JwtUserEntity) {
    return this.produtosService.update(updateProdutoDto, user.id)
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() user: JwtUserEntity) {
    return this.produtosService.remove(id, user.id)
  }

  @ApiBearerAuth()
  @Get('like/:id')
  like(@Param('id') id: string, @AuthUser() user: JwtUserEntity) {
    return this.produtosService.like(id, user.id)
  }
}
