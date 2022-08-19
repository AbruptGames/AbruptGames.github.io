import { Component, OnInit } from '@angular/core';

export enum OS {
  Windows,
  MacOs,
  Linux,
}

@Component({
  selector: 'abrupt-valley-download',
  templateUrl: './abrupt-valley-download.component.html',
  styleUrls: ['./abrupt-valley-download.component.css']
})
export class AbruptValleyDownloadComponent implements OnInit {

  constructor() {
    if (navigator.userAgent.indexOf("Win") != -1) {
      this.selectedOS = OS.Windows;
    } else if (navigator.userAgent.indexOf("Mac") != -1) {
      this.selectedOS = OS.MacOs;
    } else if (navigator.userAgent.indexOf("Linux") != -1) {
      this.selectedOS = OS.Linux;
    } else {
      console.log("No OS detected from user-agent, defaulting to windows");
      this.selectedOS = OS.Windows;
    }
  }

  OS: typeof OS = OS;

  ngOnInit(): void {
  }

  public selectedOS: OS;

  public selectOs(selection: OS) {
    this.selectedOS = selection;
  }

  public getIconUrl(os: OS) {
    switch (os) {
      case OS.Windows:
        return "https://www.shareicon.net/data/256x256/2015/08/10/82776_windows_4096x4096.png";
      case OS.MacOs:
        return "https://icons-for-free.com/download-icon-bxl+apple-1325051930531953651_256.ico";
      case OS.Linux:
        return "https://icon-library.com/images/linux-icon-vector/linux-icon-vector-3.jpg";
    }
  }

  public getDownloadLink() {
    switch (this.selectedOS) {
      case OS.Windows:
        return "https://www.shareicon.net/data/256x256/2015/08/10/82776_windows_4096x4096.png";
      case OS.MacOs:
        return "";
      case OS.Linux:
        return "";
    }
  }
}
