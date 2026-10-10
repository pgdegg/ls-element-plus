import { nextTick } from 'vue'
import { afterEach, describe, expect, test } from 'vitest'
import MessageBox from '../src/messageBox'
import { triggerNativeCompositeClick } from '@element-plus/test-utils/composite-click'

afterEach(() => {
  MessageBox.setConfirmDefaults({ resolveOnCancel: false })
  MessageBox.close()
  document.body.innerHTML = ''
})
describe('confirm defaults', () => {
  test('cancellation resolves while explicit options retain rejection', async () => {
    MessageBox.setConfirmDefaults({ resolveOnCancel: true })
    const result = MessageBox.confirm('confirm')
    await nextTick()
    triggerNativeCompositeClick(
      document.querySelector('.el-message-box__btns button')!
    )
    await expect(result).resolves.toBe('cancel')
    MessageBox.close()
    const rejected = MessageBox.confirm('confirm', { resolveOnCancel: false })
    const assertion = expect(rejected).rejects.toBe('cancel')
    await nextTick()
    const buttons = document.querySelectorAll('.el-message-box__btns button')
    triggerNativeCompositeClick(buttons[buttons.length - 2])
    await assertion
  })
})
