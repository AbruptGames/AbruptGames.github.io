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

  public getIconName(os: OS) {
    switch (os) {
      case OS.Windows:
        return "windows.png";
      case OS.MacOs:
        return "mac.png";
      case OS.Linux:
        return "linux.png";
    }
  }

  public getDownloadLink() {
    switch (this.selectedOS) {
      case OS.Windows:
        return "../assets/downloads/AbruptValleyWindows.zip";
      case OS.MacOs:
        return "../assets/downloads/AbruptValleyMac.zip";
      case OS.Linux:
        return "../assets/downloads/AbruptValleyLinux.zip";
    }
  }
}
