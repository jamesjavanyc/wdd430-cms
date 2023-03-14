export default class CommonResponse<T>{
    constructor(
        public message: String,
        public data: T
    ){}
}