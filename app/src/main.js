import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
//import './assets/styles/layout.scss';
import './assets/demo/flags/flags.css';
import moment from 'moment';
import { createApp, reactive } from 'vue';
import router from './router';
import store from './store';

import Keycloak from 'keycloak-js'
import AppWrapper from './AppWrapper.vue';
import PrimeVue from 'primevue/config';
import AutoComplete from 'primevue/autocomplete';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import Button from 'primevue/button';
import Breadcrumb from 'primevue/breadcrumb';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import Chart from 'primevue/chart';
import Checkbox from 'primevue/checkbox';
import VirtualScroller from 'primevue/virtualscroller';
import Chip from 'primevue/chip';
import Chips from 'primevue/chips';
import ColorPicker from 'primevue/colorpicker';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import ContextMenu from 'primevue/contextmenu';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import Editor from 'primevue/editor';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import Fieldset from 'primevue/fieldset';
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';
import InlineMessage from 'primevue/inlinemessage';
import Inplace from 'primevue/inplace';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Knob from 'primevue/knob';
import Galleria from 'primevue/galleria';
import Listbox from 'primevue/listbox';
import MegaMenu from 'primevue/megamenu';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import OrderList from 'primevue/orderlist';
import OrganizationChart from 'primevue/organizationchart';
import OverlayPanel from 'primevue/overlaypanel';
import Paginator from 'primevue/paginator';
import Panel from 'primevue/panel';
import PanelMenu from 'primevue/panelmenu';
import Password from 'primevue/password';
import PickList from 'primevue/picklist';
import ProgressBar from 'primevue/progressbar';
import Rating from 'primevue/rating';
import RadioButton from 'primevue/radiobutton';
import Ripple from 'primevue/ripple';
import SelectButton from 'primevue/selectbutton';
import ScrollPanel from 'primevue/scrollpanel'
import ScrollTop from 'primevue/scrolltop';
import Slider from 'primevue/slider';
import Sidebar from 'primevue/sidebar';
import Skeleton from 'primevue/skeleton';
import SplitButton from 'primevue/splitbutton';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Steps from 'primevue/steps';
import StyleClass from 'primevue/styleclass';
import TabMenu from 'primevue/tabmenu';
import Tag from 'primevue/tag';
import TieredMenu from 'primevue/tieredmenu';
import Textarea from 'primevue/textarea';
import Timeline from 'primevue/timeline';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Tooltip from 'primevue/tooltip';
import ToggleButton from 'primevue/togglebutton';
import Tree from 'primevue/tree';
import TreeSelect from 'primevue/treeselect';
import TreeTable from 'primevue/treetable';
import TriStateCheckbox from 'primevue/tristatecheckbox';

import CodeHighlight from './AppCodeHighlight';
import BlockViewer from './BlockViewer';
import Row from 'primevue/row';
import ColumnGroup from 'primevue/columngroup';

/*router.beforeEach(function(to, from, next) {
    window.scrollTo(0, 0);
    next();
});*/

moment.locale('fr');
let theme_link=document.getElementById("theme-link")

let urls = {
  api: process.env.VUE_APP_API_URL,//'http://localhost:8000/',
  login: process.env.VUE_APP_SSO_URL,//'http://localhost:2020' ,// insert your http or https://<KeycloakURL>/auth
  cns: process.env.VUE_APP_CNS_URL//'http://localhost:8080/' // Verify the shown ports
}

store.commit("setAPIAndLogin", urls);
function instantiateVueApp (keycloak) {
        store.commit('setKeyCloak',keycloak)
        // router.beforeEach(function(to, from, next) {
        //     window.scrollTo(0, 0);
        //     next();
        // });
        window.Keycloak = keycloak

        const app = createApp(AppWrapper);

        app.config.globalProperties.$appState = reactive({ theme: 'lara-light-indigo', darkTheme: false });
        app.config.globalProperties.$API_URL=process.env.VUE_APP_API_URL


        app.use(PrimeVue, { ripple: true, inputStyle: 'outlined' });
        app.use(ConfirmationService);
        app.use(ToastService);
        app.use(store);
        app.use(router);

        app.directive('tooltip', Tooltip);
        app.directive('ripple', Ripple);
        app.directive('code', CodeHighlight);
        app.directive('badge', BadgeDirective);
        app.directive('styleclass', StyleClass);
        app.component('Editor',Editor);
        app.component('Accordion', Accordion);
        app.component('AccordionTab', AccordionTab);
        app.component('AutoComplete', AutoComplete);
        app.component('Avatar', Avatar);
        app.component('AvatarGroup', AvatarGroup);
        app.component('Badge', Badge);
        app.component('Breadcrumb', Breadcrumb);
        app.component('Button', Button);
        app.component('Calendar', Calendar);
        app.component('Card', Card);
        app.component('Carousel', Carousel);
        app.component('Chart', Chart);
        app.component('Checkbox', Checkbox);
        app.component('Chip', Chip);
        app.component('Chips', Chips);
        app.component('ColorPicker', ColorPicker);
        app.component('Column', Column);
        app.component('ConfirmDialog', ConfirmDialog);
        app.component('ConfirmPopup', ConfirmPopup);
        app.component('ContextMenu', ContextMenu);
        app.component('DataTable', DataTable);
        app.component('DataView', DataView);
        app.component('DataViewLayoutOptions', DataViewLayoutOptions);
        app.component('Dialog', Dialog);
        app.component('Divider', Divider);
        app.component('Dropdown', Dropdown);
        app.component('Fieldset', Fieldset);
        app.component('FileUpload', FileUpload);
        app.component('Image', Image);
        app.component('InlineMessage', InlineMessage);
        app.component('Inplace', Inplace);
        app.component('InputMask', InputMask);
        app.component('InputNumber', InputNumber);
        app.component('InputSwitch', InputSwitch);
        app.component('InputText', InputText);
        app.component('Galleria', Galleria);
        app.component('Knob', Knob);
        app.component('Listbox', Listbox);
        app.component('MegaMenu', MegaMenu);
        app.component('Menu', Menu);
        app.component('Menubar', Menubar);
        app.component('Message', Message);
        app.component('VirtualScroller', VirtualScroller);
        
        app.component('MultiSelect', MultiSelect);
        app.component('OrderList', OrderList);
        app.component('OrganizationChart', OrganizationChart);
        app.component('OverlayPanel', OverlayPanel);
        app.component('Paginator', Paginator);
        app.component('Panel', Panel);
        app.component('PanelMenu', PanelMenu);
        app.component('Password', Password);
        app.component('PickList', PickList);
        app.component('ProgressBar', ProgressBar);
        app.component('RadioButton', RadioButton);
        app.component('Rating', Rating);
        app.component('SelectButton', SelectButton);
        app.component('ScrollPanel', ScrollPanel);
        app.component('ScrollTop', ScrollTop);
        app.component('Slider', Slider);
        app.component('Sidebar', Sidebar);
        app.component('Skeleton', Skeleton);
        app.component('SplitButton', SplitButton);
        app.component('Splitter', Splitter);
        app.component('SplitterPanel', SplitterPanel);
        app.component('Steps', Steps);
        app.component('TabMenu', TabMenu);
        app.component('TabView', TabView);
        app.component('TabPanel', TabPanel);
        app.component('Tag', Tag);
        app.component('Textarea', Textarea);
        app.component('TieredMenu', TieredMenu);
        app.component('Timeline', Timeline);
        app.component('Toast', Toast);
        app.component('Toolbar', Toolbar);
        app.component('ToggleButton', ToggleButton);
        app.component('Tree', Tree);
        app.component('TreeSelect', TreeSelect);
        app.component('TreeTable', TreeTable);
        app.component('TriStateCheckbox', TriStateCheckbox);
        app.component('Row', Row);
        app.component('ColumnGroup', ColumnGroup);

        app.component('BlockViewer', BlockViewer);
        app.config.globalProperties.$moment=moment;

        app.mount('#app');

}

// instantiateVueApp(keycloak)
const initOptions = {
    url: store.state.endpoints.login,
    realm: process.env.VUE_APP_SSO_REALM, //'abcompany_external',
    clientId: process.env.VUE_APP_SSO_CLIENTID,//'app1_frontend',
    onLoad: 'login-required'
  }

  const keycloak = Keycloak(initOptions)
  keycloak.init({ onLoad: initOptions.onLoad}).then((auth) => {
    if (!auth) {
      window.location.reload();
    } 
    // console.info("--> Log: Authenticated");
    // console.log('isAdmin ='+keycloak.hasRealmRole('admin'))
        //{keycloak:keycloak}w
    
    
    let payload = {
        isRealmAdmin: keycloak.hasRealmRole('admin'),
        idToken: keycloak.idToken,
        accessToken: keycloak.token,
      }
      
      if (keycloak.token && keycloak.idToken && keycloak.token != '' && keycloak.idToken != '') {
        store.commit("login", payload);
        /*console.log("--> log: get username : " + keycloak.subject);
        console.log("--> log: User has logged in: " + keycloak.subject);
        console.log("--> log: TokenParsed: "+ JSON.stringify(keycloak.tokenParsed));
        console.log("--> log: User name: " + keycloak.tokenParsed.preferred_username);
        console.log("--> log: accessToken: " + store.state.user.accessToken);*/
        payload = {
          name: keycloak.tokenParsed.preferred_username,
          id: keycloak.subject
        };
        store.commit("setName", payload);
        /*
          Get the current local language from keycloak
        */
        //localStorage.setItem('localeLang',keycloak.tokenParsed.locale)
        store.commit("setLocaleLang", {localeLang:localStorage.getItem('localeLang')?localStorage.getItem('localeLang'):'fr'});
        if (store.state.user.localeLang=='ar'){
          document.body.style.direction="rtl";
          theme_link.setAttribute("href", process.env.BASE_URL+"themes/lara-light-indigo/theme-rtl.css");
          import('./assets/styles/layout_rtl.scss');
          document.title="SOPIMEM";
          
        }else if(store.state.user.localeLang=='fr'){
          document.body.style.direction="ltr";
          theme_link.setAttribute("href", process.env.BASE_URL+"themes/lara-light-indigo/theme.css");
          import('./assets/styles/layout.scss');
          document.title="SOPIMEM";
        }else{
          document.body.style.direction="ltr";
          theme_link.setAttribute("href", process.env.BASE_URL+"themes/lara-light-indigo/theme.css");
          import('./assets/styles/layout.scss');
          document.title="SOPIMEM";

        }
        instantiateVueApp(keycloak)
        console.log("**keeeeeycloakc**",store.state.keycloak.hasRealmRole('admin'));

      }
      else {
        store.commit("logout");
      }
    
      setInterval(() => {
        //console.log("--> log: interval ");
        // console.log("--> Log before token update: isAuthenticated ", store.state.user.isAuthenticated);
        keycloak.updateToken().then((refreshed) => {
          // console.log("--> Log After token updated: isAuthenticated ", store.state.user.isAuthenticated);
          if (store.state.user.isAuthenticated != false ) {
            if (refreshed) {
              // console.log("--> Log: refreshed ");         
              let payloadRefreshedTokens = {
                idToken: keycloak.idToken,
                accessToken: keycloak.token
              }
    
              if ((keycloak.token && keycloak.idToken != '') && (keycloak.idToken != '')) {
                store.commit("login", payloadRefreshedTokens);
              }
              else {
                // console.log("--> Log: token refresh problems");  
                payloadRefreshedTokens = {
                  idToken: "",
                  accessToken: ""
                }
                // store.commit("login", payloadRefreshedTokens);
                // store.commit("logout");
              }
            }
          } else {
            // console.log("--> Log: logout isAuthenticated  =", store.state.user.isAuthenticated);
            
            var logoutOptions = { redirectUri : urls.cns };
            // console.log("--> Log: logoutOptions  ", logoutOptions  );
                
            keycloak.logout(logoutOptions).then((success) => {
                  // console.log("--> Log: logout success ", success );
            }).catch((error) => {
                  console.log("--> Log: logout error ", error );
            });
            store.commit("logout");
          }
        }).catch(() => {
          console.log("--> Log: catch interval");
        });
      }, 30000)
    }).catch(() => {
      console.log("-->Log: Failed to authenticate");
    });
    
    
    // console.log("**hhhhh**",store.state.keycloak);
  