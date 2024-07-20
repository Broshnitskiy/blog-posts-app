import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as BlogPost } from './post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Return all posts.',
    type: [BlogPost],
  })
  findAll(): BlogPost[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by id' })
  @ApiResponse({ status: 200, description: 'Return the post.', type: BlogPost })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  findOne(@Param('id') id: number): BlogPost {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
    type: BlogPost,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createPostDto: CreatePostDto): BlogPost {
    return this.postsService.create(createPostDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
    type: BlogPost,
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): BlogPost {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: 204,
    description: 'The post has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  remove(@Param('id') id: number): void {
    this.postsService.remove(id);
  }
}
