import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(UserService);

    });

    it('should be created', () => {
        expect(service).toBeTruthy;
    })




    /*   let userService: SpyObj<UserService>;
       
    let usersMock: CustomResponse = {
           timestamp: new Date(),
           statusCode: HttpStatusCode.Ok,
           reason: '',
           message: '',
           developerMessage: '',
           data: {
               objList: [
                   { id: 1, username: "Walter White", bio: "I am the one who knocks." },
                   { id: 2, username: "Jesse Pinkman", bio: "Yeah, bitch! MAGNETS!" },
               ] as User[], obj: { id: 1, username: "Walter White", bio: "I am the one who knocks." } as User
           }
       }
       let envMock = {
           apiUrl: 'http://example.com',
       };
   
       beforeEach(() => {
           TestBed.configureTestingModule({
               imports: [HttpClientModule],
               providers: [UserService]
           });
           service = TestBed.inject(UserService);
           userService = createSpyObj('users', ['list'], ['rootUrl']);
   
       });
   
   
       it("should get current user coordinates", (done: DoneFn) => {
           let customReponse: CustomResponse;
           service.users$.subscribe({
               next: value => {
                   customReponse = value;
                   expect(customReponse.data).not.toBeUndefined();
                   expect(customReponse.data.objList).toBeNull;
                   expect(customReponse.data.obj?.id).not.toBeNull();
                   done();
               },
               error: err => console.error(err),
               complete: () => console.log('DONE!')
           });
   
       })
   
       afterEach(()=>{
   
       });*/
})
