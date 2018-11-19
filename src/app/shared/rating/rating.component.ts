import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  rates: number[] = [1,2,3,4,5]
  rate: number = 0
  previousRate: number = 0

  constructor() { }

  ngOnInit() {
  }

  setRate(r: number) {
    this.rate = r
    this.previousRate = 0
  }

  setTemporaryRate(r: number) {
    if (this.previousRate === 0) {
        this.previousRate = this.rate }

    this.rate = r
  }

  clearTemporaryRate() {
    if (this.previousRate !== 0) {
      this.rate = this.previousRate
      this.previousRate = 0 }
  }
}
