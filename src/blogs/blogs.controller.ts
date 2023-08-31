import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { REQUEST_ID_HEADER } from 'src/shared/constants'
import { BlogsService } from './blogs.service'
import { EntityCreated } from 'src/shared/dto/entity-created.dto'
import { BlogRequestDto } from './dto/blog-request.dto'
import { PaginatedBlogsResponseDto } from './dto/paginated-blogs-response.dto'
import { RequestIdInterceptor } from 'src/shared/interceptors/request-id.interceptor'
import { JwtAuthGuard } from 'src/auth/gaurds/jwt.gaurd'
import { AuthorizedCommonRequest } from 'src/shared/dto/common-request.dto'

@ApiTags('Blogs')
@ApiBearerAuth('JWT-auth')
@UseInterceptors(RequestIdInterceptor)
@Controller('v1/blogs')
export class BlogsController {
  private readonly logger: Logger = new Logger(BlogsController.name)
  constructor(
    private readonly blogsSerivce: BlogsService,
  ) {
    this.logger.log({
      method: 'constructor',
      message: 'BlogsController initialization',
    })
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Header('content-type', 'application/json')
  @ApiHeader({
    name: REQUEST_ID_HEADER,
    description: 'RequestId',
    example: 'd62f9082-e92a-4927-8d61-22decae74887',
    required: true,
    allowEmptyValue: false,
    schema: {
      format: 'uuid',
      default: randomUUID(),
    },
  })
  @ApiOperation({
    description: 'send request to get all blogs',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: PaginatedBlogsResponseDto,
  })
  async getAllBlogs(
    @Req() req: Request & AuthorizedCommonRequest,
    @Res() res: Response,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    this.logger.log('auth user', {
      user: req.user
    })
    let requestId = req.requestId
    const [
      blogs,
      total
    ] = await Promise.all([
      this.blogsSerivce.findAll(limit, page),
      this.blogsSerivce.countAll()
    ])
    this.logger.log({
      method: this.getAllBlogs.name,
      message: 'sending blogs response',
      requestId,
      limit,
      page,
    })
    res.status(HttpStatus.OK).json({
      data: blogs,
      total,
      page,
      limit
    })
  }

  @Get('/:blogId')
  @HttpCode(200)
  @Header('content-type', 'application/json')
  @ApiHeader({
    name: REQUEST_ID_HEADER,
    description: 'RequestId',
    example: 'd62f9082-e92a-4927-8d61-22decae74887',
    required: true,
    allowEmptyValue: false,
    schema: {
      default: randomUUID(),
    },
  })
  @ApiOperation({
    description: 'send request to get all blogs',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: PaginatedBlogsResponseDto,
  })
  async getBlogDetails(
    @Req() req: Request & { requestId: string },
    @Res() res: Response,
    @Param('blogId') blogId: number
  ) {
    let requestId = req.requestId
    const result = await this.blogsSerivce.findById(blogId)
    if(!result) {
      throw new HttpException('blog not found', HttpStatus.NOT_FOUND)
    }
    this.logger.log({
      method: this.getAllBlogs.name,
      message: 'sending blogs response',
      requestId,
    })
    res.status(HttpStatus.OK).json({
      data: result,
    })
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Header('content-type', 'application/json')
  @ApiHeader({
    name: REQUEST_ID_HEADER,
    description: 'RequestId',
    example: 'd62f9082-e92a-4927-8d61-22decae74887',
    required: true,
    allowEmptyValue: false,
    schema: {
      default: randomUUID(),
    },
  })
  @ApiOperation({
    description: 'send request to add a new blog',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: EntityCreated,
  })
  async createBlog(
    @Req() req: Request & { requestId: string },
    @Res() res: Response,
    @Body() blogRequestDto: BlogRequestDto
  ) {
    let requestId = req.requestId
    const id = await this.blogsSerivce.createBlog(blogRequestDto, requestId)
    res.status(HttpStatus.CREATED).json({
      id
    })
  }
}
