import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }

  toHTML() {
    return `<div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>`
  }

  initComponent() {
    super.initComponent()
    this.$formula = this.$root.find('#formula')
    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })

    // this.$on('table:input', $cell => {
    //   this.$formula.text($cell.text())
    // })

    // this.$subscribe(state => {
    //   this.$formula.text(state.currentText)
    // })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()

      this.$emit('formula:done')
    }
  }
}

