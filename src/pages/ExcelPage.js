import {Page} from '@core/Page'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '@/redux/initialState'
import {debounce, storage} from '@core/utils'
import {Formula} from '@/components/formula/Formula'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Table} from '@/components/table/Table'
import {Excel} from '@/components/excel/excel'

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()
    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))

    const stateListener = debounce(state => {
      storage(storageName(params), state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel( {
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
