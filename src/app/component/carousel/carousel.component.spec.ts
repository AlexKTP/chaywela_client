import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CarouselComponent } from './carousel.component';


describe('CarouselComponent', () => {

    let fixture: ComponentFixture<CarouselComponent>;
    let app: CarouselComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                CarouselComponent
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CarouselComponent);
        app = fixture.componentInstance;

        app.ngOnInit();

        await fixture.whenStable();
    });

    it('should create', () => {
        expect(app).toBeTruthy();
    });

    it(`has at least 1 user`, async () => {
        app.appState$.subscribe(result => {
            expect(app.numberOfUsers).toBeGreaterThanOrEqual(1);
        })

    })
});
