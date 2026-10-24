import { defineComponent, getCurrentInstance, nextTick, watch } from 'vue'
import { ElOption } from '@element-plus/components/select'

const component = defineComponent({
  extends: ElOption,
  setup(props, ctx) {
    const result = (ElOption.setup as NonNullable<any>)(props, ctx)

    // 调用 methods.selectOptionClick
    delete result.selectOptionClick

    const vm = (getCurrentInstance() as NonNullable<any>).proxy

    // Fix: https://github.com/element-plus/element-plus/issues/7917
    // `el-option` 会在卸载前删除缓存，
    // 对于扁平数组 `<el-select><el-option v-for="3"></el-select>` 这是正常的，
    // 因为相同的节点 key 不会产生 diff 节点，
    // 但在树数据中，不同层级的相同 key 会产生 diff 节点，
    // 因此 `nextTick` 中 `el-option` 的销毁会慢于
    // 新 `el-option` 的创建，从而删除新节点，
    // 这里恢复被删除的节点。
    // @link https://github.com/element-plus/element-plus/blob/6df6e49db07b38d6cc3b5e9a960782bd30879c11/packages/components/select/src/option.vue#L78
    nextTick(() => {
      if (!result.select.states.cachedOptions.get(vm.value)) {
        result.select.onOptionCreate(vm)
      }
    })

    watch(
      () => ctx.attrs.visible,
      (val) => {
        nextTick(() => {
          result.states.visible = val
        })
      },
      {
        immediate: true,
      }
    )

    return result
  },
  methods: {
    selectOptionClick() {
      // $el.parentElement => el-tree-node__content
      this.$el.parentElement.click()
    },
  },
})

export default component
