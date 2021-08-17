
// import { Button, NavBar } from 'vant';
import Vant, { Toast } from 'vant';
import 'vant/lib/index.css';

export default function (app: any){
  // app.use(Button);
  // app.use(NavBar);
  app.use(Vant);
  app.config.globalProperties.$toast = Toast;
}
