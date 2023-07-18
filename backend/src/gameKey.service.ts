import { Injectable } from "@nestjs/common";

@Injectable()
export class GameKeyService {

    async getGameKey() {
        return new Promise((resolve) => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const groups = [];
          
            for (let i = 0; i < 3; i++) {
              let group = '';
              for (let j = 0; j < 5; j++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                const randomChar = characters[randomIndex];
                group += randomChar;
              }
              groups.push(group);
            }
          
            resolve(groups.join('-'));
        });
    }
}
