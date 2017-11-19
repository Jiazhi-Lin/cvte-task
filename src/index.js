import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';

import AuthExample from './components/App/AuthExample';

// 使用 react-router 进行路由管控
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


// 路由配置 这个以后可以搞到单独的文件夹中
// const routes = {
//   path: '/app',
//   component: App
  // childRoutes: [
  //   { path: 'about', component: About },
  //   { path: 'inbox', component: Inbox },
  // ]
// }

ReactDOM.render((
	<div>
		<Router>
		<ul>
	        <li><Link to="/app">Public Page</Link></li>
	        <li><Link to="/AuthExample">Protected Page</Link></li>
	     </ul>
			<Route component={App} path="/app" />
		</Router>
	</div>
  ),document.getElementById('root')
);