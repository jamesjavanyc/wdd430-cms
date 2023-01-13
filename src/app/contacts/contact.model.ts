export default class Contact{
    constructor(
        // 权限修饰符直接把这些属性赋值给实例对象
        public id: string,
        public name: string,
        public email: string,
        public phone: string,
        public imageUrl: string,
        public group: Contact[]
    ) {
        
    }
}