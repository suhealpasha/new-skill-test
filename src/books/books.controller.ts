import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Post()
 async addBook(
    @Body('title') bookTitle: string,
    @Body('description') bookDescription: string,
  ) {
    const generatedId = await this.booksService.insertBook(
      bookTitle,
      bookDescription,
    );
    return { id: generatedId };
  }
  @Get()
  async getAllBooks(){
      const books = await this.booksService.getBooks();
      return books
  }
  @Get(':id')
  getBook(@Param('id') bookId:string){
      return this.booksService.getSingleBook(bookId);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') bookId: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    await this.booksService.updateBook(bookId, title, description);
    return null;
  }

  @Delete(':id')
  async removeBook(@Param('id') bookId: string) {
      await this.booksService.deleteBook(bookId);
      return null;
  }
}
