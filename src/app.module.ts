import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose'
@Module({
  imports: [BooksModule,MongooseModule.forRoot('mongodb+srv://root:root123@cluster0.5uqh6.mongodb.net/my-skill-db?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
