import { Player } from './Player';

export class Lineup {
    constructor(
        public objectid: string,
        public formation: string,
        public captain: string,
        public matchday: number,
        public points: number,
        public team: string,
        public players: Player[],
        // public player1: Player,
        // public player2: Player,
        // public player3: Player,
        // public player4: Player,
        // public player5: Player,
        // public player6: Player,
        // public player7: Player,
        // public player8: Player,
        // public player9: Player,
        // public player10: Player,
        // public player11: Player,
        // public bench1: Player,
        // public bench2: Player,
        // public bench3: Player
    ) {}
}
