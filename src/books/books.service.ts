import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.model';
import { Model } from 'mongoose';
@Injectable()
export class BooksService {
  private books: Book[] = [];
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async insertBook(title: string, description: string) {
    const newBook = new this.bookModel({
      title: title,
      description: description,
    });
    const result = await newBook.save();
    return result.id as string;
  }
  async getBooks() {
    const books = await this.bookModel.find().exec();
    return books.map((b) =>({id:b.id,title:b.title,description:b.description}));
  }

  async getSingleBook(bookId: string) {
    const book = await this.findBook(bookId);
    return {id:book.id,title:book.title,description:book.description};
  }
  async updateBook(bookId: string, title: string, description: string) {
    const updatedBook = await this.findBook(bookId);   
 
    if (title) {
      updatedBook.title = title;
    }
    if (description) {
      updatedBook.description = description;
    }
    updatedBook.save();
  }
  async deleteBook(prodId: string) {
    const result = await this.bookModel.deleteOne({_id: prodId}).exec();    
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findBook(id: string): Promise<Book> {
    let book;
    try{
       book = await this.bookModel.findById(id);
    }
    catch(error){
      throw new NotFoundException('Coud not find book');
    }

    if (!book) {
      throw new NotFoundException('Coud not find book');
    }
    return book;
  }
}
