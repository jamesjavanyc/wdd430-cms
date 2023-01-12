import { Component, Output, EventEmitter } from '@angular/core';

// 组件装饰器 
@Component({
  // 组件选择器
  // 不常用 ： 如果想要作为属性选择器， 可以写成 selector: '[app-header]' 使用的时候则是<div app-header></div>
  // 不常用 ：也可以写成类选择器 selector: '.app-header'， <div class="app-header"></div>
  selector: 'app-header',
  // html文件地址
  templateUrl: './header.component.html',
  // 样式文件地址
  styleUrls: ['./header.component.css']
})
  
  // 导出的组件类
export class HeaderComponent {
  // 创建事件，在点击nav的时候获取用户要的widget
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(selectedEvent:string): void{
    this.selectedFeatureEvent.emit(selectedEvent);
  }

}
