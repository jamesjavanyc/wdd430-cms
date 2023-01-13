export default class Document{
    constructor(
        public id: String,
        public name: String,
        public description: String,
        public url: String,
        public children: Document[]
    ) {
        
    }
}