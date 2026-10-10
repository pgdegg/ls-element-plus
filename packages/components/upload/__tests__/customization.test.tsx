import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import UploadContent from '../src/upload-content.vue'

describe('upload validation', () => {
  test('validates size and type before hooks or network and removes once', async () => {
    const beforeUpload = vi.fn()
    const request = vi.fn()
    const remove = vi.fn()
    const invalid = vi.fn()
    const wrapper = mount(UploadContent, {
      props: {
        maxSize: 3,
        validateAccept: true,
        accept: '.TXT',
        beforeUpload,
        httpRequest: request,
        onRemove: remove,
        onValidationError: invalid,
      },
    })
    const input = wrapper.find('input')
    const file = new File(['large'], 'test.txt')
    vi.spyOn(input.element, 'files', 'get').mockReturnValue([
      file,
    ] as unknown as FileList)
    await input.trigger('change')
    await flushPromises()
    expect(invalid).toHaveBeenCalledWith('size', file)
    expect(remove).toHaveBeenCalledTimes(1)
    expect(beforeUpload).not.toHaveBeenCalled()
    expect(request).not.toHaveBeenCalled()
    await wrapper.setProps({ maxSize: 10 })
    await input.trigger('change')
    await flushPromises()
    expect(request).toHaveBeenCalledTimes(1)
    const bad = new File(['a'], 'test.png')
    vi.spyOn(input.element, 'files', 'get').mockReturnValue([
      bad,
    ] as unknown as FileList)
    await input.trigger('change')
    await flushPromises()
    expect(invalid).toHaveBeenLastCalledWith('type', bad)
    expect(remove).toHaveBeenCalledTimes(2)
    wrapper.unmount()
    vi.restoreAllMocks()
  })
})
