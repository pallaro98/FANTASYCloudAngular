export class Team {
    constructor(
        public objectid: string,
        public user: string,
        public league: string,
        public name: string,
        public badge: string,
        public lineup: string,
        public budget: number,
        public value: number,
        public favorpoints: number,
        public againstpoints: number,
        public leaguepoints: number,
        public record: string
    ) {}
}
