import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Player {
  id: String,
  username: String,
  rankedWins: number,
  rankedLosses: number,
  elo: number
}

@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://13.38.232.70:5000/";

  public players: Player[] = [];

  ngOnInit(): void {
    this.http.get<Player[]>(this.baseUrl + "leaderboard").subscribe(data => {
      this.players = data.concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data);
      console.log("fetched players: ", this.players);
    });
  }

}
