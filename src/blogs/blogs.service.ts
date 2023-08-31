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

  countAll({
    createdBy
  }: { createdBy: number}): Promise<number> {
    return this.blogsRepository.count({
      where: {
        createdBy
      }
    })
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
    const newBlog = this.blogsRepository.create({
      title: blog.title,
      description: blog.description,
      createdBy
    })
    await this.blogsRepository.save(newBlog)
    this.logger.log('New blog created successfully', {
      requestId,
      blog,
      newBlog
    })
    return newBlog
  }

  updateBlog(blogId: BlogId, blog: Partial<Blog>) {
    return this.blogsRepository
      .createQueryBuilder()
      .update({
        title: blog.title,
        description: blog.description
      } as Partial<Blog>)
      .where("id = :id", { id: blogId })
      .execute()
  }

  deleteBlog(blogId: BlogId) {
    return this.blogsRepository
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id: blogId })
      .execute()
  }
}