import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CarouselComponent } from './carousel.component';


describe('CarouselComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                CarouselComponent
            ],
        }).compileComponents();
    });

    it(`should have at least 1 user`, () => {
        const fixture = TestBed.createComponent(CarouselComponent);
        const app = fixture.componentInstance;
        expect(app.numberOfUsers).toBeGreaterThanOrEqual(0);
    });
});
