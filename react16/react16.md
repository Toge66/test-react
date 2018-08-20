# 16.0
* render方法可以返回数组，react组件、字符串
* portal ：

	不用创建一个新的div，如下加载子组件到’domNode’，’domNode’是已经可用的DOM节点
	
	```
	ReactDOM.createPortal(
	    this.props.children,
	    domNode,
	  )
	```

* 更快的额服务端渲染：比react15要快3倍
* 支持自定义的DOM属性
	现在，React不会忽略无法识别的HTML和SVG属性，而是将他们传递给DOM，这样做的另一个好处是允许我们摆脱React的大部分白名单属性，从而减少文件大小
* 减少了文件大小
	+ react：从20.7kb（6.9kb gzipped）-> 5.3kb（2.2kb gzipped）
	+ react-dom：141kb（42.9kb gzipped） -> 103.7kb（32.6kb gzipped）
* react16是在新的核心架构上的第一个react版本
* 弃用一些插件：[https://reactjs.org/blog/2017/04/07/react-v15.5.0.html#discontinuing-support-for-react-addons](https://reactjs.org/blog/2017/04/07/react-v15.5.0.html#discontinuing-support-for-react-addons)
* setState的一些变化
	+ 使用null调用setState不再出发更新
	+ 在render方法中调用setState会触发更新，以前的时候不是这样的。但是你不应该在render里调用setState
	+ setState的回掉函数会在componentDidMount/componentDidUpdate之后被执行，而不像以前是在所有的component重新渲染后执行
	componentDidUpdate不会再接收到prevContext参数

#16.2
* 支持使用`Fragment`替代render的返回数组

	> render
	> 
	> ```
	render() {
	 return [
	  "Some text.",
	  <h2 key="heading-1">A heading</h2>,
	  "More text.",
	  <h2 key="heading-2">Another heading</h2>,
	  "Even more text."
	 ];
	}
	```
	>`Fragment`
	>
	>```
	render() {
	  return (
	    <Fragment>
	      Some text.
	      <h2>A heading</h2>
	      More text.
	      <h2>Another heading</h2>
	      Even more text.
	    </Fragment>
	  );
	}
	```

	+ Babel v7.0.0-beta.31 及以上支持Fragment
	+ TypeScript v2.6.2版本支持Fragment
	+ ESLint 3.x

* `componentWillMount``componentWillreceiveProps``componentWillUpdate` 是不安全的生命周期方法[https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)
打算在17.0版本删除这几个生命周期方法，但是这几个生命和周期方法加UNSAFE_前缀的方法可以继续使用

* 增加静态生命周期方法`getDerivedStateFromprops``getSnapshotBeforeUpdate`

	 ```
	 class Example extends React.Component {
	  	static getDerivedStateFromProps(props, state) {
	    // …
	  	}
	 }
	 ```
	+ `getDerivedStateFromProps`和`componentDidUpdate`一块替代`componentWillReceiveprops`
	+ `getSnapshotBeforeUpdate`和`componentDidUpdate`一块替代`componentWillUpdate`


#16.3.0
* 增加新的API 
 + createRef API 新增加一种，之前是有回掉函数和string方式
 	 
	 ```
		 class MyComponent extends React.Component {
		  constructor(props) {
		    super(props);
		    this.inputRef = React.createRef();
		  }
		  render() {
		    return <input type="text" ref={this.inputRef} />;
		  }
		  componentDidMount() {
		    this.inputRef.current.focus();
		  }
		}
		Context API
		const ThemeContext = React.createContext('light');
		
		class ThemeProvider extends React.Component {
		  state = {theme: 'light'};
		
		  
		  render() {
		    return (
		      <ThemeContext.Provider value={this.state.theme}>
		        {this.props.children}
		      </ThemeContext.Provider>
		    );
		  }
		}
		
		class ThemedButton extends React.Component {
		  render() {
		    return (
		      <ThemeContext.Consumer>
		        {theme => <Button theme={theme} />}
		      </ThemeContext.Consumer>
		    );
		  }
		}
	 ```
 + Official Context API
 
	 ```
		const ThemeContext = React.createContext('light');
		
		class ThemeProvider extends React.Component {
		  state = {theme: 'light'};
		
		  render() {
		    return (
		      <ThemeContext.Provider value={this.state.theme}>
		        {this.props.children}
		      </ThemeContext.Provider>
		    );
		  }
		}
		
		class ThemedButton extends React.Component {
		  render() {
		    return (
		      <ThemeContext.Consumer>
		        {theme => <Button theme={theme} />}
		      </ThemeContext.Consumer>
		    );
		  }
		}
	 ```
	+ forwardRef API
	
		```
		const FancyButton = React.forwardRef((props, ref) => (
		  <button ref={ref} className="FancyButton">
		    {props.children}
		  </button>
		));
		
		// You can now get a ref directly to the DOM button:
		const ref = React.createRef();
		<FancyButton ref={ref}>Click me!</FancyButton>;
		```
 + StrictMode Component
	>StrictMode是一种用于突出显示应用程序中潜在问题的工具
	>>+ 识别具有不安全生命周期的组件
	>>+ 识别遗留字符串ref API使用的警告
	>>+ Detecting unexpected side effects <----`不了解这是啥`
	>>+ Detecting legacy context API <------`不了解这是啥`
	>
	>`StrictMode`检查只会在开发模式下选型，不会影响生产环境
	
		```
			import React from 'react';
			function ExampleApplication() {
			  return (
			    <div>
			      <Header />
			      <React.StrictMode>
			        <div>
			          <ComponentOne />
			          <ComponentTwo />
			        </div>
			      </React.StrictMode>
			      <Footer />
			    </div>
			  );
			}
		```
	
#16.4
	
* 在React DOM 支持鼠标事件 [实例](https://codesandbox.io/s/kx4roq04yo)

	>`onPointerDown`: 鼠标点击
	
	>`onPointerMove`: 鼠标移动
	
	>`onPointerUp`: 鼠标抬起
	
	>`onPointerCancel`: ???
	
	>`onGotPointerCapture`: 捕获点击
	
	>`onLostPointerCapture`: 丢失点击
	
	>`onPointerEnter`: 鼠标进入
	
	>`onPointerLeave`: 鼠标离开
	
	>`onPointerOver`: //和onPointerEnter效果一样
	
	>`onPointerOut`: //和onPointerLeave效果一样
