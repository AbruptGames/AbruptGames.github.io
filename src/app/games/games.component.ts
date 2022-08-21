import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface GameSummary {
  BlueName: string,
  RedName: string,
  BlueWins: number,
  RedWins: number
}

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://93.4.139.220:5000/";

  public games: GameSummary[] = [];
  public history: GameSummary[] = [];


  ngOnInit(): void {
    this.http.get<GameSummary[]>(this.baseUrl + "current-games").subscribe(data => {
      this.games = data;
      console.log("fetched games: ", this.games);
    });

    this.http.get<GameSummary[]>(this.baseUrl + "game-history").subscribe(data => {
      this.history = data;
      console.log("fetched history games: ", this.history);
    });
  }

}
