import { Component, OnInit, Input } from '@angular/core';
import  Contact  from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  // input注解可以从html文件中获取属性值并注入到ContactItemComponent对象的属性中 
  // alias：如果是@input(“custom”) 那么就是指定了custom属性， 即<div custom = "1"> 获取1， 否则则是获取ContactItemComponent对象的属性名即contact
  @Input()
  contact!: Contact;

  // 构造器会先在对象创建时执行， 此时不能获取到输入属性@input()的值
  // 主要用于依赖注入
  constructor() { }

// Angular中生命周期钩子的调用顺序如下：
// ngOnChanges -- 当绑定的数值发生变化时触发
// ngOnInit() -- 在Angular第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件。在第一轮ngOnChanges()完成之后调用，只调用一次。
// ngDoCheck -- 紧跟在每次执行变更检测时的 ngOnChanges() 和 首次执行变更检测时的 ngOnInit() 后调用
// ngAfterContentInit -- 第一次 ngDoCheck() 之后调用，只调用一次。
// ngAfterContentChecked -- ngAfterContentInit() 和每次 ngDoCheck() 之后调用
// ngAfterViewInit -- 第一次 ngAfterContentChecked() 之后调用，只调用一次
// ngAfterViewChecked -- ngAfterViewInit() 和每次 ngAfterContentChecked() 之后调用。
// ngOnDestroy -- 当Angular每次销毁指令/组件之前调用并清扫。在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏。在Angular销毁指令/组件之前调用。
  ngOnInit(): void {
    
  }

}
