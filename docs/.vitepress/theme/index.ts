// import './styles/index.css'
import './custom.css'
import { h} from 'vue'
import { VPTheme } from '@vue/theme'
import Banner from './components/Banner.vue'


export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    return h(VPTheme.Layout, null, {
      banner: () => h(Banner),
      // 'sidebar-top': () => h(PreferenceSwitch)
    })
  }
})
