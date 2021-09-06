import { Module } from "@nestjs/common";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import {MongooseModule} from '@nestjs/mongoose';
import { BookSchema } from "./book.model";
@Module({
    imports:[MongooseModule.forFeature([{name:'Book',schema:BookSchema}])],
    controllers:[BooksController],
    providers:[BooksService]
})
export class BooksModule{}