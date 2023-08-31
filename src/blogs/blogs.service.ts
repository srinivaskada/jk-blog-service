import { Injectable, Logger, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { BlogRequestDto } from './dto/blog-request.dto';
import { BlogId, UserId } from 'src/types/common.type';

@Injectable()
export class BlogsService {
  private readonly logger: Logger = new Logger(BlogsService.name)
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  findAll({ createdBy }: {
    createdBy: number
  }, {limit, page} : {
    limit: number,
    page: number
  }): Promise<Blog[]> {
    return this.blogsRepository.find({
      where: {
        createdBy
      },
      order: {
        createdAt: 'DESC'
      },
      take: limit,
      skip: (page-1) * limit
    });
  }

  countAll(): Promise<number> {
    return this.blogsRepository.count()
  }

  findByTitle(title: string): Promise<Blog> {
    return this.blogsRepository.findOne({
      where: {
        title
      }
    })
  }

  findById(id: BlogId) {
    return this.blogsRepository.findOne({
      where: {
        id
      },
    })
  }

  async createBlog(blog: BlogRequestDto, createdBy: UserId, requestId: string) {
    const result = await this.blogsRepository.insert({
      title: blog.title,
      description: blog.description,
      createdBy
    })
    this.logger.log('New blog created successfully', {
      requestId,
      blog,
      result
    })
    return result.identifiers[0].id as number
  }
}