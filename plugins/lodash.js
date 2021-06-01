import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.use(VueLodash, { name: '$_', lodash })

export default (context, inject) => {
  inject('_', Vue.lodash)
}
