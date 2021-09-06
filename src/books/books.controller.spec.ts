import { Test,TestingModule } from "@nestjs/testing";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";

describe('BooksController', ()=>{
    let controller: BooksController;

    const mockBooksService = {
        create: jest.fn(dto => {
            return {
                id:Date.now(),
                ...dto
            }
        }),
       update:jest.fn().mockImplementation((id,dto) => ({
           id,
           ...dto
       }
       )),
    }

    beforeEach(async () =>{
        const module: TestingModule = await Test.createTestingModule({
            controllers:[BooksController],
            providers:[BooksService]
        }).overrideProvider(BooksService)
        .useValue(mockBooksService)
        .compile();
        controller = module.get<BooksController>(BooksController)
    })
    it('Should be defined', () =>{
        expect(controller).toBeDefined();
    });

    it('Should create book', () =>{
        const dto = {title:'Mybook' , description:' My book description'}
        expect(controller.addBook('Mybook','My book description')).toEqual(
            {id:expect.any(String),
            title:'Mybook'
            }
          
        );
        expect(mockBooksService.create).toHaveBeenCalledWith('Mybook','My book description')
    });

    it('Should update book',()=>{
        const dto = {title:'Mybook' , description:' My book description'}
        expect(controller.updateBook('1','mybook','Updated description')).toEqual({
            id:1,
            ...dto
        })

        expect(mockBooksService.update).toHaveBeenCalled();
    })

})
